import api from './api';


export const getMenuItems = async (params) => {
  try {
    const response = await api.get('/menu-items', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMenuItemById = async (id) => {
  try {
    const response = await api.get(`/menu-items/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};