const express = require("express");
const router = express.Router();
const { authenticate, requireRole } = require("../middlewares/auth.middleware");
const { postOrder, listOrders, getOrder, updateOrderStatus } = require("../controllers/order.controller");

router.post("/", authenticate, postOrder);
router.get("/", authenticate, listOrders);
router.get("/:id", authenticate, getOrder);
router.patch("/:id/status", authenticate, requireRole("ADMIN"), updateOrderStatus);

module.exports = router;