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
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="price">${product.price}</p>
        <button 
          onClick={handleAddToCart}
          className="button primary"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;