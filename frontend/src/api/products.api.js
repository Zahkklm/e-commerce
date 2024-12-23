// frontend/src/api/products.api.js
import API from './index';

export const productsAPI = {
    getAll: () => API.get('/products'),
    getById: (id) => API.get(`/products/${id}`),
    create: (data) => API.post('/products', data),
    update: (id, data) => API.patch(`/products/${id}`, data),    
    getByCategory: (category) => API.get(`/products/category/${category}`),
  //  getMobilePhones: () => API.get('/products/category/mobile-phones'),
    likeProduct: (productId) => API.post(`/products/${productId}/like`),
    unlikeProduct: (productId) => API.delete(`/products/${productId}/like`),
    getLikes: (productId) => API.get(`/products/${productId}/likes`)
  };