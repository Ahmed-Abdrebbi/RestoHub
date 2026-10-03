const prisma = require("../src/lib/prisma");

const items = [
  { name: "Tagine Poulet", description: "Poulet mijote aux olives et citron confit", price: 75, category: "Plats", allergens: [] },
  { name: "Couscous Royal", description: "Semoule, legumes, poulet et merguez", price: 85, category: "Plats", allergens: [] },
  { name: "Tagine Kefta", description: "Boulettes de viande hachee, sauce tomate, oeuf", price: 70, category: "Plats", allergens: ["oeuf"] },
  { name: "Pastilla au Poulet", description: "Feuilletage sucre-sale, poulet, amandes, cannelle", price: 90, category: "Plats", allergens: ["gluten", "fruits a coque"] },
  { name: "Harira", description: "Soupe traditionnelle aux lentilles, pois chiches et tomates", price: 25, category: "Entrees", allergens: [] },
  { name: "Salade Marocaine", description: "Tomates, concombres, oignons, persil", price: 35, category: "Entrees", allergens: [] },
  { name: "Chebakia", description: "Patisserie au miel et sesame", price: 15, category: "Desserts", allergens: ["gluten", "sesame"] },
  { name: "Jus d Orange", description: "Jus d orange frais presse", price: 20, category: "Boissons", allergens: [] },
  { name: "The a la Menthe", description: "The vert traditionnel a la menthe fraiche", price: 15, category: "Boissons", allergens: [] },
];

async function seed() {
  for (const item of items) {
    const created = await prisma.menuItem.create({ data: item });
    console.log(`✓ ${created.name}`);
  }
  await prisma.$disconnect();
}

seed().catch((err) => {
  console.error(err);
  prisma.$disconnect();
});