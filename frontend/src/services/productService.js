import api from './api';

const productService = {
  getProducts: async (filters = {}) => {
    const { data } = await api.get('/products', { 
      params: filters 
    });
    return data; // Ensure it returns the full response object
  },

  getProductById: async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  searchProducts: async (searchTerm) => {
    const { data } = await api.get('/products/search', { 
      params: { q: searchTerm } 
    });
    return data;
  }
};

export default productService;