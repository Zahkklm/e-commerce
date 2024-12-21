import { useCart } from '../../hooks/useCart';
import { useNotification } from '../../hooks/useNotification';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, getTotal, removeFromCart } = useCart();
  const { addNotification } = useNotification();

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    addNotification('Item removed from cart', 'info');
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <Link to="/" className="button primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {items.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            onRemove={() => handleRemoveItem(item.id)} 
          />
        ))}
      </div>
      <div className="cart-summary">
        <p>Total: ${getTotal()}</p>
        <Link to="/checkout" className="button primary">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;