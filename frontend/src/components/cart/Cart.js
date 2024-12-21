import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';

const Cart = () => {
  const { items, getTotal } = useCart();

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="cart-total">
        Total: ${getTotal()}
      </div>
    </div>
  );
};

export default Cart;