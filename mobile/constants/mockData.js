// ─── Mock Data ──────────────────────────────────────────────
// All hardcoded data in one file – delete when real API is wired.

export const MOCK_USER = {
  id: "u1",
  name: "Alex Johnson",
  email: "alex@example.com",
  phone: "+1 (555) 012-3456",
  avatar: null, // uses initials fallback
};

export const MOCK_CATEGORIES = [
  { id: "c1", name: "Burger", icon: "fast-food", iconSet: "Ionicons", count: 24 },
  { id: "c2", name: "Pizza", icon: "pizza", iconSet: "Ionicons", count: 18 },
  { id: "c3", name: "Chicken", icon: "restaurant", iconSet: "MaterialIcons", count: 15 },
  { id: "c4", name: "Salad", icon: "leaf", iconSet: "Ionicons", count: 12 },
  { id: "c5", name: "Drinks", icon: "wine", iconSet: "Ionicons", count: 20 },
  { id: "c6", name: "Dessert", icon: "ice-cream", iconSet: "Ionicons", count: 10 },
];

export const MOCK_MENU_ITEMS = [
  {
    id: "m1",
    name: "Cheesy Bacon Burger",
    description:
      "Two flame-grilled 100% prime beef patties layered with crispy smoked bacon, melted aged cheddar, crisp romaine lettuce, ripe vine tomatoes, and our signature smoky chipotle aioli on a toasted artisanal brioche bun crafted fresh daily.",
    price: 12.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjgQaTmRR35Xkrz_BgLOLkGxLGn32QtEorf3FuQG5RNZ-y43jFRmC79byZ9olKMLz3AylCwKyxjO834qzLr0nad5vkRcWdeJ4WOdj5fltKxhOwisEIOQ-YRld1wJo_-Q3ZNn2XeZViCabYQKoRLiIaQxz-CjdjHXL8ICV9jNnO1uWyef-GDwYPczjM1I-5GmEabzy3XvMUAqJJfld2HFdt1NTQgJsd3y0GZNUdNOGSE1oF_erqmItD",
    rating: 4.9,
    reviews: 128,
    calories: 650,
    prepTime: "15-20 min",
    categoryId: "c1",
    badge: "Chef's Special",
    options: [
      { id: "o1", name: "Extra Aged Cheddar Cheese", detail: "Sharp & melted", price: 0.5 },
      { id: "o2", name: "Crispy Smoked Bacon Strips", detail: "Applewood double-smoked", price: 1.5 },
      { id: "o3", name: "Caramelized Balsamic Onions", detail: "Slow-cooked sweet savory", price: 0.75 },
      { id: "o4", name: "Jalapeño Pepper Relish", detail: "Spicy kick", price: 0.5 },
      { id: "o5", name: "Truffle Garlic Mayo Dip", detail: "Rich black winter truffle", price: 1.0 },
    ],
  },
  {
    id: "m2",
    name: "Rustic Pepperoni Pizza",
    description:
      "Handcrafted artisanal pepperoni pizza with charred blistered wood-fired crust, cup-and-char pepperoni, fresh oregano and hot honey drizzle.",
    price: 15.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuOI9llcCKLOAOM1NFP_Jfml8s8-xh-sILZndclbAtqJGy3DABYhYEGV_o5PEZOAzO5jcRmocWqlYQgeB-X5nGtfy5QYTeXts6GhVQ0rb6DaA_PnKE7S5_o3az_WOwY9IC8kFO9UpPRKwWLSKOZb_mhVxLEKsXPFwQQT9fN8WLm89oqAI6LiWiaEnmPENToaS6-HOrxC8QIkFdz89noP8OhcV0rv5uhUDKuWJ6xZQH-P187Mz0FO8x",
    rating: 4.8,
    reviews: 95,
    calories: 820,
    prepTime: "20-25 min",
    categoryId: "c2",
    badge: null,
    options: [],
  },
  {
    id: "m3",
    name: "Crispy Chicken Tenders",
    description:
      "Golden crisp buttermilk fried chicken tenders served with rich smoky dipping sauce, crispy coating texture, coarse sea salt flakes.",
    price: 10.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe62zcYPTxFdduCPegVmt2Qgt3JjdbaQbwAMOY57Do-j8lkDs2oKYRsdZ0FUifxkCKbswaVC5rZOBF3LrLl5Re-hc4wtSZGmLtuhP2q6qFBB6FXyP6xCHUl147m13gg_xd9vgoMoyQvjdtVb1m-tWv8xdns3dUhhRMQfehe9JuuZaRaI238aN5sbvy_MaZ28ktYVSa7Boo4iM-GET4uKsUeyRGUECIoJFCa2FUSqNEJS_tavbKz0ms",
    rating: 4.9,
    reviews: 210,
    calories: 480,
    prepTime: "12-15 min",
    categoryId: "c3",
    badge: null,
    options: [],
  },
  {
    id: "m4",
    name: "Greek Avocado Salad",
    description:
      "Vibrant Mediterranean salad bowl with ripe sliced avocado, kalamata olives, diced organic feta cheese, cherry tomatoes, crisp cucumber ribbons with extra virgin olive oil drizzle.",
    price: 9.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb4xNgs60Wbib8kqdm-NP6gUaS5ZJ6dVhCXM5VVPrjrxAK5BkPcb_qfHeOd13uC-bwpYsgUUxLrLjFcHwDMObx40Mn6-pCAUdBnz6mp9jHEtKsgzuAr7WqQM1yiy6lkLMA0JghTAOA06ImSGyKGZAJP60rD5iOMxNEr4W_WjrQeTKAyqtZlNfhhHJQpgilTiG0UyjKB14V4yzWcnBsp8XRVEy8rB0LDhJnM2gA0KQ6QL7uGnmFXdss",
    rating: 4.7,
    reviews: 74,
    calories: 320,
    prepTime: "10-12 min",
    categoryId: "c4",
    badge: null,
    options: [],
  },
  {
    id: "m5",
    name: "Double Beef Burger Deluxe",
    description:
      "Our signature best-seller. Double stack of premium Angus beef with special house sauce, lettuce, pickles, and melted Swiss.",
    price: 14.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVb-YIs4p2CKMq7CBQWxzVltLJzcyCtc482HEGrvcqdHZI6Fu2ul8mpnALNiIl7KbklCNnRc59PZctZg23n9l6884IXOEYEupqUCYouzOW9CrnYsuiQIzkL9TYKisl5-_FZnp-ydYydbKsvlDzf6EiFaP4q2hb14vvt31OiM0SfYuOGb0WtsKy4cXDDvhf5YNImgbjliOO3rSdMS0JRxLy8vP6IBYd6JU9BpyLmmjZ9hu0yHajt9kY",
    rating: 4.9,
    reviews: 312,
    calories: 780,
    prepTime: "18-22 min",
    categoryId: "c1",
    badge: "Best Seller",
    options: [],
  },
  {
    id: "m6",
    name: "Sparkling Citrus Mojito",
    description: "Refreshing sparkling mojito with fresh lime, mint, and a dash of elderflower syrup.",
    price: 6.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb4xNgs60Wbib8kqdm-NP6gUaS5ZJ6dVhCXM5VVPrjrxAK5BkPcb_qfHeOd13uC-bwpYsgUUxLrLjFcHwDMObx40Mn6-pCAUdBnz6mp9jHEtKsgzuAr7WqQM1yiy6lkLMA0JghTAOA06ImSGyKGZAJP60rD5iOMxNEr4W_WjrQeTKAyqtZlNfhhHJQpgilTiG0UyjKB14V4yzWcnBsp8XRVEy8rB0LDhJnM2gA0KQ6QL7uGnmFXdss",
    rating: 4.6,
    reviews: 58,
    calories: 120,
    prepTime: "5 min",
    categoryId: "c5",
    badge: null,
    options: [],
  },
];

export const MOCK_ORDERS = [
  {
    id: "ord1",
    number: "#1234",
    status: "delivered",
    date: "Sep 28, 2026",
    total: 28.48,
    items: [
      { name: "Cheesy Bacon Burger", qty: 1, price: 12.99 },
      { name: "Rustic Pepperoni Pizza", qty: 1, price: 15.5 },
    ],
    estimatedTime: null,
    deliveryAddress: "Table 14",
  },
  {
    id: "ord2",
    number: "#1235",
    status: "preparing",
    date: "Oct 01, 2026",
    total: 17.27,
    items: [
      { name: "Cheesy Bacon Burger Deluxe", qty: 1, price: 14.99 },
      { name: "Truffle Garlic Mayo Dip", qty: 1, price: 1.0 },
    ],
    estimatedTime: "12-15 min",
    deliveryAddress: "Table 14",
  },
  {
    id: "ord3",
    number: "#1220",
    status: "cancelled",
    date: "Sep 25, 2026",
    total: 9.5,
    items: [{ name: "Greek Avocado Salad", qty: 1, price: 9.5 }],
    estimatedTime: null,
    deliveryAddress: "Table 8",
  },
];

export const MOCK_CHAT_MESSAGES = [
  {
    id: "msg1",
    role: "assistant",
    text: "Hello Alex! 👋 I'm your Digital Waiter today. Looking for chef recommendations, dietary pairings, or ready to order right now?",
    time: "7:42 PM",
  },
  {
    id: "msg2",
    role: "user",
    text: "Can you recommend a burger and check if you have gluten-free buns?",
    time: "7:43 PM",
  },
  {
    id: "msg3",
    role: "assistant",
    text: 'Our **Cheesy Bacon Burger Deluxe** is the kitchen favorite tonight!\n\n✅ Freshly baked artisanal gluten-free brioche is available upon request!\n\nShall I prepare this for your table?',
    time: "7:43 PM",
  },
  {
    id: "msg4",
    role: "user",
    text: "Yes please, 1 Cheesy Bacon Burger Deluxe with extra cheese, and 1 Truffle Garlic Mayo Dip.",
    time: "7:44 PM",
  },
  {
    id: "msg_confirm",
    role: "confirmation",
    time: "7:44 PM",
    orderSummary: {
      items: [
        { name: "Cheesy Bacon Burger Deluxe", detail: "Gluten-free bun, Extra Aged Cheddar", qty: 1, price: 14.99 },
        { name: "Truffle Garlic Mayo Dip", detail: "House special recipe", qty: 1, price: 1.0 },
      ],
      tax: 1.28,
      total: 17.27,
      eta: "12-15m",
      status: "Pending",
    },
  },
];

export const FEATURED_BANNER = {
  title: "Double Beef Burger Deluxe",
  subtitle: "Get 20% off on your first order!",
  badge: "★ Our Best Seller",
  itemId: "m5",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVb-YIs4p2CKMq7CBQWxzVltLJzcyCtc482HEGrvcqdHZI6Fu2ul8mpnALNiIl7KbklCNnRc59PZctZg23n9l6884IXOEYEupqUCYouzOW9CrnYsuiQIzkL9TYKisl5-_FZnp-ydYydbKsvlDzf6EiFaP4q2hb14vvt31OiM0SfYuOGb0WtsKy4cXDDvhf5YNImgbjliOO3rSdMS0JRxLy8vP6IBYd6JU9BpyLmmjZ9hu0yHajt9kY",
};
