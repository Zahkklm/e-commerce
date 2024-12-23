import API from './index';

export const productsAPI = {
  // Existing product endpoints
  getAll: () => API.get('/products'),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.patch(`/products/${id}`, data),    
  getByCategory: (category) => API.get(`/products/category/${category}`),
  likeProduct: (productId) => API.post(`/products/${productId}/like`),
  unlikeProduct: (productId) => API.delete(`/products/${productId}/like`),
  getLikes: (productId) => API.get(`/products/${productId}/likes`),

  // Cart endpoints
  getCart: () => API.get('/cart'),
  addToCart: (productId) => API.post(`/cart/items/${productId}`),
  removeFromCart: (productId) => API.delete(`/cart/items/${productId}`),
  updateCartQuantity: (productId, quantity) => API.patch(`/cart/items/${productId}`, { quantity }),
  clearCart: () => API.delete('/cart'),
  
  // Checkout endpoint
  checkout: (cartData) => API.post('/cart/checkout', cartData)
};