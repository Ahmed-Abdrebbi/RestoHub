const prisma = require("../lib/prisma");
const { createOrder } = require("../services/order.service");

async function postOrder(req, res) {
  try {
    const order = await createOrder(req.user.id, req.body.items);
    return res.status(201).json(order);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message || "Erreur serveur" });
  }
}

async function listOrders(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const { status } = req.query;

  const where = {
    ...(req.user.role !== "ADMIN" && { userId: req.user.id }),
    ...(status && { status }),
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit,
      include: { items: { include: { menuItem: true } } },
    }),
    prisma.order.count({ where }),
  ]);

  return res.json({ orders, page, limit, total, totalPages: Math.ceil(total / limit) });
}

async function getOrder(req, res) {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: { items: { include: { menuItem: true } } },
  });
  if (!order) return res.status(404).json({ error: "Commande introuvable" });
  if (req.user.role !== "ADMIN" && order.userId !== req.user.id) {
    return res.status(403).json({ error: "Accès refusé" });
  }
  return res.json(order);
}

async function updateOrderStatus(req, res) {
  const { status } = req.body;
  const validStatuses = ["PENDING", "PREPARING", "READY", "DELIVERED"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `status doit être l'un de: ${validStatuses.join(", ")}` });
  }
  try {
    const order = await prisma.order.update({ where: { id: req.params.id }, data: { status } });
    return res.json(order);
  } catch {
    return res.status(404).json({ error: "Commande introuvable" });
  }
}

module.exports = { postOrder, listOrders, getOrder, updateOrderStatus };