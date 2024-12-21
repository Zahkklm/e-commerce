import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './Router';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import NotificationToast from './components/notifications/NotificationToast';
import websocketService from './services/webSocketService';

//import './styles/index.css';

function App() {
  useEffect(() => {
    websocketService.connect();
  }, []);

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