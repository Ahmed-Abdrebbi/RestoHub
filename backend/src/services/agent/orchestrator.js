const OpenAI = require("openai");
const prisma = require("../../lib/prisma");
const { searchMenu } = require("../menu.service");
const { createOrder } = require("../order.service");
const { toolSchemas } = require("./tools");

const openai = new OpenAI({ 
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1" 
});

const MAX_ITER = 5;

async function executeTool(name, args, context) {
  switch (name) {
    case "search_menu":
      return searchMenu(args.query);

    case "add_to_cart": {
      const item = await prisma.menuItem.findUnique({ where: { id: args.item_id } });
      if (!item) return { error: "Article introuvable" };
      return { item_id: item.id, name: item.name, price: item.price, quantity: args.quantity || 1 };
    }

    case "check_order_status": {
      const order = await prisma.order.findUnique({ where: { id: args.order_id } });
      if (!order || order.userId !== context.userId) return { error: "Commande introuvable" };
      return { order_id: order.id, status: order.status, totalPrice: order.totalPrice };
    }

    case "place_order": {
      if (!args.confirmed) {
        return { error: "confirmation_requise", message: "Confirmation explicite du client requise avant de finaliser." };
      }
      const order = await createOrder(context.userId, args.items);
      return { order_id: order.id, status: order.status, totalPrice: order.totalPrice };
    }

    default:
      return { error: `Outil inconnu: ${name}` };
  }
}

async function runAgentConversation({ messages, onToken, onToolEvent, context }) {
  let iter = 0;

  while (iter < MAX_ITER) {
    iter++;
    const stream = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b",
      stream: true,
      messages,
      tools: toolSchemas,
      tool_choice: "auto",
    });

    let content = "";
    const toolCallsAcc = {};

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta;

      if (delta?.content) {
        content += delta.content;
        onToken(delta.content);
      }

      if (delta?.tool_calls) {
        for (const tc of delta.tool_calls) {
          if (!toolCallsAcc[tc.index]) toolCallsAcc[tc.index] = { id: tc.id, name: "", arguments: "" };
          if (tc.function?.name) toolCallsAcc[tc.index].name += tc.function.name;
          if (tc.function?.arguments) toolCallsAcc[tc.index].arguments += tc.function.arguments;
        }
      }
    }

    const toolCalls = Object.values(toolCallsAcc);

    if (toolCalls.length === 0) {
      messages.push({ role: "assistant", content });
      return { finalContent: content };
    }

    messages.push({
      role: "assistant",
      content: content || null,
      tool_calls: toolCalls.map((tc) => ({
        id: tc.id,
        type: "function",
        function: { name: tc.name, arguments: tc.arguments },
      })),
    });

    for (const tc of toolCalls) {
      const args = JSON.parse(tc.arguments || "{}");
      const result = await executeTool(tc.name, args, context);
      await onToolEvent({ tool: tc.name, args, result });
      messages.push({ role: "tool", tool_call_id: tc.id, content: JSON.stringify(result) });
    }
}

  throw new Error("MAX_ITER atteint sans réponse finale du modèle");
}

module.exports = { runAgentConversation };
