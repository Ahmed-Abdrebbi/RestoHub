import api from './api';
import { useAuthStore } from '../store/useAuthStore';


export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { user, accessToken } = response.data;

    await useAuthStore.getState().setAuth(user, accessToken);
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.log('Logout error:', error);
  } finally {
    await useAuthStore.getState().logout();
  }
};