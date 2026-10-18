import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export const useAuthStore = create((set) => ({

  user: null,
  accessToken: null,
  isLoading: true,


  setAuth: async (user, accessToken) => {
    try {
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('user', JSON.stringify(user));
    } catch (e) {
      console.log('SecureStore save error:', e);
    }
    set({
      user,
      accessToken,
      isLoading: false,
    });
  },


  setAccessToken: (accessToken) => set({ accessToken }),


  logout: async () => {
    try {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('user');
    } catch (e) {
      console.log('SecureStore delete error:', e);
    }
    set({
      user: null,
      accessToken: null,
      isLoading: false,
    });
  },

  setIsLoading: (isLoading) => set({ isLoading }),

  rehydrate: async () => {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      const userJson = await SecureStore.getItemAsync('user');
      const user = userJson ? JSON.parse(userJson) : null;
      set({
        user: accessToken ? user : null,
        accessToken: accessToken || null,
        isLoading: false,
      });
    } catch (e) {
      console.log('SecureStore rehydration error:', e);
      set({ isLoading: false });
    }
  },
}));