import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Header = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">E-Commerce</Link>
      </div>
      <nav>
        <Link to="/products">Products</Link>
        {user ? (
          <>
            <Link to="/cart">Cart ({items.length})</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;