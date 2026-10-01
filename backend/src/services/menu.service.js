const prisma = require("../lib/prisma");
const { embedText } = require("./embedding.service");

async function searchMenu(query, limit = 5) {
  const queryEmbedding = await embedText(query);
  const vectorLiteral = `[${queryEmbedding.join(",")}]`;

  return prisma.$queryRaw`
    SELECT id, name, description, price, category, allergens, "isAvailable",
           embedding <=> ${vectorLiteral}::vector AS distance
    FROM "MenuItem"
    WHERE "isAvailable" = true
    ORDER BY distance ASC
    LIMIT ${limit}
  `;
}

module.exports = { searchMenu };