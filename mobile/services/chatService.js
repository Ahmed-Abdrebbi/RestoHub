import EventSource from 'react-native-sse';
import { useAuthStore } from '../store/useAuthStore';
import { useConversationStore } from '../store/useConversationStore';

const BASE_URL = 'http://localhost:3000/api';

/**
 * Sends a chat message via SSE streaming.
 * 
 * @param {string} message - The user's message
 * @param {object} callbacks - { onToken, onTool, onDone, onError }
 * @returns {function} cleanup function to close the SSE connection
 */
export const sendChatMessage = (message, callbacks = {}) => {
  const { onToken, onTool, onDone, onError } = callbacks;
  const token = useAuthStore.getState().accessToken;
  const conversationId = useConversationStore.getState().conversationId;

  const body = JSON.stringify({
    message,
    ...(conversationId && { conversationId }),
  });

  const es = new EventSource(`${BASE_URL}/agent/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body,
  });

  es.addEventListener('conversation', (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.conversationId) {
        useConversationStore.getState().setConversationId(data.conversationId);
      }
    } catch (e) {
      // ignore parse errors
    }
  });

  es.addEventListener('token', (event) => {
    try {
      const data = JSON.parse(event.data);
      const text = data.content || data.token || data.text || '';
      if (text && onToken) {
        onToken(text);
      }
    } catch (e) {
      // If the data is plain text, use it directly
      if (event.data && onToken) {
        onToken(event.data);
      }
    }
  });

  es.addEventListener('tool', (event) => {
    if (onTool) {
      try {
        const data = JSON.parse(event.data);
        onTool(data);
      } catch (e) {
        onTool({ name: event.data });
      }
    }
  });

  es.addEventListener('done', (event) => {
    es.close();
    if (onDone) {
      try {
        const data = JSON.parse(event.data);
        onDone(data);
      } catch (e) {
        onDone({});
      }
    }
  });

  es.addEventListener('error', (event) => {
    es.close();
    if (onError) {
      onError(event?.message || 'SSE connection error');
    }
  });

  // Return cleanup function
  return () => {
    es.close();
  };
};