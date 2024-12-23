import React, { useState, useEffect } from "react";
import Categ from "./Categ";
import { useNavigate } from "react-router-dom";
import Shopcart from "./Shopcart";
import { productsAPI } from "../../api/products.api";
import "./shop.css";

const Shop = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMobilePhones = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getMobilePhones();
        setProducts(response.data.products);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchMobilePhones();
  }, []);

  const handleRedirect = () => {
    navigate("/all-products");
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <section className="shop background">
      <div className="container shop-container">
        <Categ shopItems={products} addToCart={addToCart} />
        <div className="shop-main">
          <div className="heading heading-view-all">
            <div className="heading-left row f_flex">
              <h2>Mobile Phones</h2>
            </div>
            <div onClick={handleRedirect} className="heading-right row">
              <span>View All</span>
              <i className="fa fa-caret-right"></i>
            </div>
          </div>
          <div className="product-content">
            <Shopcart shopItems={products} addToCart={addToCart} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;