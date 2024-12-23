// frontend/src/api/orders.api.js 
export const ordersAPI = {
  create: (data) => API.post('/orders', data),
  getOrders: () => API.get('/orders'),
  getById: (id) => API.get(`/orders/${id}`)
};