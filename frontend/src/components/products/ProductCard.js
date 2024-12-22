import { useCart } from '../../hooks/useCart';
import { useNotification } from '../../hooks/useNotification';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addNotification } = useNotification();

  const handleAddToCart = () => {
    addToCart(product);
    addNotification(`${product.name} added to cart`, 'success');
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <button onClick={handleAddToCart} className="button button-primary">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;