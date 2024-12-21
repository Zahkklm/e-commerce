import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductList from './components/products/ProductList';
import Cart from './components/cart/Cart';
import PaymentForm from './components/payment/PaymentForm';
import Profile from './components/auth/Profile';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/checkout" 
        element={
          <ProtectedRoute>
            <PaymentForm />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default Router;