import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import ProductSearch from './ProductSearch';
import productService from '../../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    search: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts(filters);
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error('API response is not an array:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  return (
    <div className="products-container">
      <div className="filters-section">
        <ProductSearch onSearch={(term) => setFilters(prev => ({ ...prev, search: term }))} />
        <ProductFilter filters={filters} onFilterChange={setFilters} />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;