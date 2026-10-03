const toolSchemas = [
  {
    type: "function",
    function: {
      name: "search_menu",
      description: "Recherche des plats du menu par similarité sémantique. À utiliser pour toute question sur les plats, allergènes, composition, ou recommandations.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Requête en langage naturel, ex: 'plat sans gluten avec du poulet'" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "add_to_cart",
      description: "Ajoute un article au panier. N'exécute PAS la commande, juste l'ajout au panier.",
      parameters: {
        type: "object",
        properties: {
          item_id: { type: "string", description: "id du MenuItem, obtenu via search_menu" },
          quantity: { type: "integer", description: "Quantité, défaut 1" },
        },
        required: ["item_id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_order_status",
      description: "Vérifie le statut d'une commande existante du client.",
      parameters: {
        type: "object",
        properties: { order_id: { type: "string" } },
        required: ["order_id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "place_order",
      description: "Finalise et crée réellement la commande. N'appeler avec confirmed=true QUE si le client a explicitement confirmé dans son DERNIER message (ex: 'oui', 'je confirme').",
      parameters: {
        type: "object",
        properties: {
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                menuItemId: { type: "string" },
                quantity: { type: "integer" },
              },
              required: ["menuItemId", "quantity"],
            },
          },
          confirmed: { type: "boolean", description: "true UNIQUEMENT si confirmation explicite du client" },
        },
        required: ["items", "confirmed"],
      },
    },
  },
];

module.exports = { toolSchemas };