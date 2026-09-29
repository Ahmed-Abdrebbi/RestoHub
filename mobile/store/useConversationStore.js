import { create } from "zustand";

export const useConversationStore = create((set, get) => ({
  messages: [],
  addMessage: (message) => set({ messages: [...get().messages, message] }),
  clear: () => set({ messages: [] }),
}));
