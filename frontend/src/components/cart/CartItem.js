import { useCart } from '../../hooks/useCart';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="item-details">
        <h4>{item.name}</h4>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ${item.price * item.quantity}</p>
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;