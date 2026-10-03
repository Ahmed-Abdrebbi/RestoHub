const prisma = require("../src/lib/prisma");

prisma.$queryRaw`SELECT id, name, "isAvailable", (embedding IS NOT NULL) AS has_embedding FROM "MenuItem"`
  .then((rows) => {
    console.log(rows);
    process.exit(0);
  })
  .catch((err) => {
    console.error("ERREUR:", err);
    process.exit(1);
  });
