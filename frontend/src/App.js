import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './Router';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import NotificationToast from './components/notifications/NotificationToast';
import './styles/index.css';
import { NotificationProvider } from './context/NotificationContext';
import websocketService from './services/webSocketService';

// Add to App component
useEffect(() => {
  websocketService.connect();
}, []);

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
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
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;