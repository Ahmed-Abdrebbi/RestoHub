import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setAuth: (data) => set(data),
  clearAuth: () => set({ user: null, accessToken: null, refreshToken: null }),
}));
