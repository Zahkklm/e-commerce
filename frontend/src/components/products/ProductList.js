import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import ProductSearch from './ProductSearch';
import { getProducts } from '../../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(filters);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;