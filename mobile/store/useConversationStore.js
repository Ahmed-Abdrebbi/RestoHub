import { create } from 'zustand';

export const useConversationStore = create((set) => ({

  messages: [],
  isStreaming: false,


  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),


  appendStreamingContent: (contentChunk) => set((state) => {
    const messages = [...state.messages];
    const lastMessage = messages[messages.length - 1];


    if (lastMessage && lastMessage.role === 'assistant') {
      lastMessage.content += contentChunk;
    } else {

      messages.push({ role: 'assistant', content: contentChunk });
    }

    return { messages };
  }),


  setIsStreaming: (status) => set({ isStreaming: status }),

  clearConversation: () => set({ messages: [], isStreaming: false })
}));