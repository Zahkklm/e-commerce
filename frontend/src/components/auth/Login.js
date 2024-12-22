import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData);
      window.location.reload(); // Force page refresh after successful login
    } catch (err) {
      const status = err.response?.status;
      if (status === 400) {
        setError('Invalid email or password');
      } else if (status === 403) {
        setError('Please verify your email before logging in');
      } else if (status === 500) {
        setError('Internal server error. Please try again later');
      } else {
        setError('Login failed. Please try again');
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="button button-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;