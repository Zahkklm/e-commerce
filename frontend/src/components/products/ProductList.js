import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import { getProducts } from '../../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000]
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(filters);
      setProducts(data);
    };
    fetchProducts();
  }, [filters]);

  return (
    <div>
      <ProductFilter filters={filters} setFilters={setFilters} />
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;