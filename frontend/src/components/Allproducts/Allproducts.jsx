import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsAPI } from "../../api/products.api";
import "./allproducts.css";

const Allproducts = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAll();
        if (!response.data || !response.data.products) {
          throw new Error('Invalid data format received');
        }
        setProducts(response.data.products);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <h1 className="page-header">All Products</h1>
      <div className="container grid3">
        {products.map((product, index) => (
          <div className="box" key={product._id || `product-${index}`}>
            <div className="product mtop">
              <div className="img">
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = product.image || './assets/discount/discount-3.png';
                  }}
                />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <Link to={`/all-products/${product._id}`}>
                  <h5>Click here for more Info</h5>
                </Link>
                <div className="rate">
                  {[...Array(5)].map((_, starIndex) => (
                    <i key={`star-${product._id}-${starIndex}`} className="fa fa-star"></i>
                  ))}
                </div>
                <div className="price">
                  <h4>${Number(product.price).toFixed(2)}</h4>
                  <button
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Allproducts;