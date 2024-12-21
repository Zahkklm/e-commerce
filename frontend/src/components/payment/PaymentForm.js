import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useNotification } from '../../hooks/useNotification';
import paymentService from '../../services/paymentService';

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const { getTotal, clearCart } = useCart();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await paymentService.processPayment({
        ...paymentData,
        amount: getTotal()
      });
      addNotification('Payment successful!', 'success');
      clearCart();
      navigate('/payment-success');
    } catch (error) {
      addNotification('Payment failed. Please try again.', 'error');
    }
  };

  return (
    <div className="payment-form">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Card Number"
          value={paymentData.cardNumber}
          onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={paymentData.expiryDate}
          onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="CVV"
          value={paymentData.cvv}
          onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
          required
        />
        <p>Total Amount: ${getTotal()}</p>
        <button type="submit" className="button primary">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentForm;