const express = require("express");
const router = express.Router();
const { authenticate, requireRole } = require("../middlewares/auth.middleware");
const { createMenuItem, updateMenuItem, deleteMenuItem, listMenuItems, getMenuItem } = require("../controllers/menuItem.controller");

router.get("/", authenticate, listMenuItems);
router.get("/:id", authenticate, getMenuItem);
router.post("/", authenticate, requireRole("ADMIN"), createMenuItem);
router.put("/:id", authenticate, requireRole("ADMIN"), updateMenuItem);
router.delete("/:id", authenticate, requireRole("ADMIN"), deleteMenuItem);

module.exports = router;