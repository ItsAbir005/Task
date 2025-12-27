import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const menuAPI = {
  getAll: () => api.get('/menu'),
};

export const orderAPI = {
  create: (data) => api.post('/order', data),
  getMyOrders: (sessionId) => api.get(`/order/my-orders?sessionId=${sessionId}`),
};

export default api;