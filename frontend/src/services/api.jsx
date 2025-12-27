import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API URL:', API_URL); // Debug log

const api = axios.create({
  baseURL: API_URL,
  headers: { 
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    console.log('Request Data:', config.data);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    if (error.response) {
      console.error('Error Response:', error.response.data);
      console.error('Error Status:', error.response.status);
    } else if (error.request) {
      console.error('No Response Received:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

export const menuAPI = {
  getAll: () => api.get('/menu'),
};

export const orderAPI = {
  create: (data) => {
    console.log('Creating order with data:', data);
    return api.post('/order', data);
  },
  getMyOrders: (sessionId) => api.get(`/order/my-orders?sessionId=${sessionId}`),
};

export default api;