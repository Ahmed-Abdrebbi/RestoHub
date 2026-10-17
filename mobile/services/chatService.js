import api from './api';


export const sendChatMessage = async (message) => {
  try {
    const response = await api.post('/agent/chat', { message });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};