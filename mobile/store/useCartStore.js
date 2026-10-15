import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],

  getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  
  addToCart: (item, quantityToAdd = 1) => set((state) => {
    const existingItem = state.items.find((i) => i.id === item.id);
    
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.id === item.id 
            ? { ...i, quantity: i.quantity + quantityToAdd } 
            : i
        ),
      };
    }
    return { items: [...state.items, { ...item, quantity: quantityToAdd }] };
  }),

  decreaseQuantity: (itemId) => set((state) => {
    const existingItem = state.items.find((i) => i.id === itemId);
    
    if (existingItem?.quantity === 1) {
      return { items: state.items.filter((i) => i.id !== itemId) };
    }
    
    return {
      items: state.items.map((i) =>
        i.id === itemId 
          ? { ...i, quantity: i.quantity - 1 } 
          : i
      ),
    };
  }),

  removeFromCart: (itemId) => set((state) => ({
    items: state.items.filter((i) => i.id !== itemId),
  })),

  clearCart: () => set({ items: [] }),

  getTotalPrice: () => {
    const items = get().items;
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));