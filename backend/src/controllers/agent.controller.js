const prisma = require("../lib/prisma");
const { runAgentConversation } = require("../services/agent/orchestrator");
const { buildSystemPrompt } = require("../services/agent/systemPrompt");

async function handleChat(req, res) {
  const { conversationId, message } = req.body;

  if (!message || typeof message !== "string" || message.length > 500) {
    return res.status(400).json({ error: "message requis, 500 caractères max" });
  }

  let conversation = conversationId
    ? await prisma.conversation.findUnique({ where: { id: conversationId } })
    : null;

  if (!conversation) {
    conversation = await prisma.conversation.create({ data: { userId: req.user.id } });
  } else if (conversation.userId !== req.user.id) {
    return res.status(403).json({ error: "Accès refusé" });
  }

  await prisma.message.create({ data: { conversationId: conversation.id, role: "user", content: message } });

  const history = await prisma.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  const messages = [
    { role: "system", content: buildSystemPrompt() },
    ...history.map((m) => ({ role: m.role, content: m.content })),
  ];

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();
  res.write(`event: conversation\ndata: ${JSON.stringify({ conversationId: conversation.id })}\n\n`);

  try {
    const { finalContent } = await runAgentConversation({
      messages,
      context: { userId: req.user.id },
      onToken: (text) => res.write(`event: token\ndata: ${JSON.stringify({ text })}\n\n`),
      onToolEvent: async ({ tool, args, result }) => {
        res.write(`event: tool\ndata: ${JSON.stringify({ tool, args, result })}\n\n`);
        await prisma.agentActionLog.create({
          data: { userId: req.user.id, functionName: tool, arguments: args, result },
        });
      },
    });

    await prisma.message.create({ data: { conversationId: conversation.id, role: "assistant", content: finalContent } });
    res.write(`event: done\ndata: {}\n\n`);
  } catch (err) {
    res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
  }

  res.end();
}

async function getConversation(req, res) {
  const conversation = await prisma.conversation.findUnique({
    where: { id: req.params.id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!conversation) return res.status(404).json({ error: "Conversation introuvable" });
  if (conversation.userId !== req.user.id) return res.status(403).json({ error: "Accès refusé" });
  return res.json(conversation);
}

module.exports = { handleChat, getConversation };