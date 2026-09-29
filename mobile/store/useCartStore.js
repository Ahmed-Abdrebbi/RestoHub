import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (item) => set({ items: [...get().items, item] }),
  removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
  clear: () => set({ items: [] }),
}));
