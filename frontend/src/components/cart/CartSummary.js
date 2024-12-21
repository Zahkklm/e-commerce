import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/helpers';

const CartSummary = () => {
  const { items, getTotal } = useCart();
  const total = getTotal();

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <div className="summary-details">
        <p>Items: {items.length}</p>
        <p>Subtotal: {formatPrice(total)}</p>
        <p>Shipping: {formatPrice(10)}</p>
        <p className="total">Total: {formatPrice(total + 10)}</p>
      </div>
      <button 
        className="checkout-button"
        disabled={items.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;