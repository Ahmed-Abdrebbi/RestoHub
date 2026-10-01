const prisma = require("../lib/prisma");
const { embedText } = require("../services/embedding.service");

async function generateEmbeddings() {
  const items = await prisma.$queryRaw`
    SELECT id, name, description, category, allergens
    FROM "MenuItem"
    WHERE embedding IS NULL
  `;

  console.log(`${items.length} article(s) sans embedding.`);

  for (const item of items) {
    const text = `${item.name}. Catégorie: ${item.category}. ${item.description}. Allergènes: ${item.allergens.join(", ") || "aucun"}.`;
    const embedding = await embedText(text);
    const vectorLiteral = `[${embedding.join(",")}]`;

    await prisma.$executeRaw`
      UPDATE "MenuItem" SET embedding = ${vectorLiteral}::vector WHERE id = ${item.id}
    `;
    console.log(`✓ ${item.name}`);
  }
}

generateEmbeddings()
  .then(() => prisma.$disconnect())
  .catch((err) => { console.error(err); prisma.$disconnect(); });