// frontend/src/api/auth.api.js
import API from './index';

export const authAPI = {
  login: (credentials) => API.post('/users/login', credentials),
  register: (data) => API.post('/users/register', data),
  logout: () => API.post('/users/logout')
};

// frontend/src/api/products.api.js
export const productsAPI = {
  getAll: () => API.get('/products'),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.patch(`/products/${id}`, data)
};

// frontend/src/api/orders.api.js 
export const ordersAPI = {
  create: (data) => API.post('/orders', data),
  getOrders: () => API.get('/orders'),
  getById: (id) => API.get(`/orders/${id}`)
};