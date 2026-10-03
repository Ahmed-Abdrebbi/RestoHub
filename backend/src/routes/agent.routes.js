const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { authenticate } = require("../middlewares/auth.middleware");
const { handleChat, getConversation } = require("../controllers/agent.controller");

const agentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Trop de messages, réessaie dans un instant." },
});

router.post("/chat", authenticate, agentLimiter, handleChat);
router.get("/conversations/:id", authenticate, getConversation);

module.exports = router;