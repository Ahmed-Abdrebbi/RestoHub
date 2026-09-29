import { create } from "zustand";

export const useMenuStore = create((set) => ({
  items: [],
  categories: [],
  setItems: (items) => set({ items }),
  setCategories: (categories) => set({ categories }),
}));
