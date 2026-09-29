const express = require("express")
const router = express.Router()
const { authenticate, requireRole } = require("../middlewares/auth.middleware")
const { createMenuItem, updateMenuItem, deleteMenuItem, } = require("../controllers/")

router.get("/", authenticate, lisMenuItems)
router.get("/", authenticate, requireRole("ADMIN"), createMenuItem)
router.get("/id", authenticate, requireRole("ADMIN"), updateMenuItem)
router.get("/:id", authenticate, requireRole("ADMIN"), deleteMenuItem)

module.exports = router