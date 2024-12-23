import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsAPI } from "../../api/products.api";
import { authService } from "../../api/auth.service";

const Shopcart = ({ shopItems, addToCart }) => {
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const likesData = {};
      for (const product of shopItems) {
        try {
          const response = await productsAPI.getLikes(product.id);
          console.log(shopItems);
          likesData[product.id] = response.data.count || 0;
        } catch (error) {
          console.error(`Failed to fetch likes for product ${product.id}:`, error);
          likesData[product.id] = 0;
        }
      }
      setLikes(likesData);
    };

    fetchLikes();
  }, [shopItems]);

  const handleLike = async (productId) => {
    if (!authService.isAuthenticated()) {
      toast.error("Please login to like products");
      return;
    }

    try {
      setLoading(true);
      await productsAPI.likeProduct(productId);
      setLikes(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1
      }));
    } catch (error) {
      console.error('Failed to like product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {shopItems.map((product) => (
        <div className="box" key={product.id}>
          <div className="product mtop">
            <div className="img">
              {product.discount > 0 && (
                <span className="discount">{product.discount}% Off</span>
              )}
              <img 
                src={product.image} 
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
              <div className="product-like">
                <label>{likes[product.id] || 0}</label> <br />
                <i 
                  className={`fa-heart ${loading ? 'disabled' : ''}`}
                  onClick={() => handleLike(product.id)}
                ></i>
              </div>
            </div>
            <div className="product-details">
              <Link to={`/all-products/${product.id}`}>
                <h3 className="truncate">{product.name}</h3>
              </Link>
              <div className="rate">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fa fa-star"></i>
                ))}
              </div>
              <div className="price">
                <h4>${Number(product.price).toFixed(2)}</h4>
                <button
                  aria-label={`Add ${product.name} to cart`}
                  onClick={() => addToCart(product)}
                  disabled={loading}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Shopcart;