const prisma = require("../lib/prisma");

async function createOrder(userId, items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw { status: 400, message: "La commande doit contenir au moins un article" };
  }

  const menuItemIds = items.map((i) => i.menuItemId);
  const menuItems = await prisma.menuItem.findMany({ where: { id: { in: menuItemIds } } });

  if (menuItems.length !== new Set(menuItemIds).size) {
    throw { status: 400, message: "Un ou plusieurs articles du menu sont introuvables" };
  }

  const unavailable = menuItems.filter((m) => !m.isAvailable);
  if (unavailable.length > 0) {
    throw { status: 409, message: `Articles indisponibles: ${unavailable.map((m) => m.name).join(", ")}` };
  }

  let totalPrice = 0;
  const orderItemsData = items.map((item) => {
    const menuItem = menuItems.find((m) => m.id === item.menuItemId);
    const quantity = item.quantity || 1;
    totalPrice += Number(menuItem.price) * quantity;
    return { menuItemId: menuItem.id, quantity, unitPrice: menuItem.price };
  });

  return prisma.order.create({
    data: { userId, totalPrice, items: { create: orderItemsData } },
    include: { items: { include: { menuItem: true } } },
  });
}

module.exports = { createOrder };