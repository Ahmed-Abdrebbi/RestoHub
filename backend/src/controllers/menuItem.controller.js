const prisma = require("../lib/prisma")

async function createMenuItem(req, res) {
  const { name, description, price, category, allergens, isAvailable } = req.body
  if (!name || !description || price === undefined || !category) {
    return res.status(400).json({ error: "name, description, price, category requis" })
  }

  try {
    const item = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        category,
        allergens: allergens || [],
        isAvailable: isAvailable ?? true,
      },
    })
    return res.status(201).json(item)
  } catch (error) {
    return res.status(500).json({ error: error.message || "Erreur serveur" })
  }
}

async function updateMenuItem(req, res) {
  const { id } = req.params
  const { name, description, price, category, allergens, isAvailable } = req.body

  try {
    const item = await prisma.menuItem.update({
      where: { id },
      data: { name, description, price, category, allergens, isAvailable },
    })
    return res.json(item)
  } catch {
    return res.status(404).json({ error: "MenuItem introuvable" })
  }
}

async function deleteMenuItem(req, res) {
  const { id } = req.params
  try {
    await prisma.menuItem.delete({
      where: { id },
    })
    return res.status(204).send()
  } catch {
    return res.status(404).json({ error: "MenuItem introuvable" })
  }
}

async function listMenuItems(req, res) {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20
  const { category, search, available, sort } = req.query

  const where = {
    ...(category && { category }),
    ...(available !== undefined && { isAvailable: available === "true" }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
  }

  const sortMap = {
    price_asc: { price: "asc" },
    price_desc: { price: "desc" },
    name_asc: { name: "asc" },
  }
  const orderBy = sortMap[sort] || { createdAt: "desc" }

  const [items, total] = await Promise.all([
    prisma.menuItem.findMany({ where, orderBy, skip: (page - 1) * limit, take: limit }),
    prisma.menuItem.count({ where }),
  ])

  return res.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) })
}

module.exports = { createMenuItem, updateMenuItem, deleteMenuItem, listMenuItems }
