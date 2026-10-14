import { create } from 'zustand';

export const useMenuStore = create((set) => ({

  items: [],
  selectedCategory: 'ALL',
  searchQuery: '',
  

  setMenuItems: (items) => set({ items }),


  setSelectedCategory: (category) => set({ selectedCategory: category }),


  setSearchQuery: (query) => set({ searchQuery: query }),
}));