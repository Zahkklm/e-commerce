import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './Router';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import NotificationToast from './components/notifications/NotificationToast';
import './styles/index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Header />
            <main className="container">
              <AppRoutes />
            </main>
            <Footer />
            <NotificationToast />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;