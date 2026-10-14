import {create} from 'zustand'

export const useCartStore = create((set) =>  ({

items: [],

addTocart: (item) => set((state) => {
  const existingItem = state.items.find((i) => i.id === item.id)
  if (existingItem) {
    return {
      items: state.items.map((i) => i.id === item.id ? { ...i, quantity: i.quamtity + 1} : i
    )
    }
  }
  return { items: [...state.items, { ...item, quantity: 1}]}
}),
clearCart: () => set({ items: []})

}))