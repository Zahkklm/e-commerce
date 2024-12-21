import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const { getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Process payment
      clearCart();
      navigate('/payment-success');
    } catch (error) {
      console.error('Payment failed:', error);
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
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={paymentData.expiryDate}
          onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
        />
        <input
          type="text"
          placeholder="CVV"
          value={paymentData.cvv}
          onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
        />
        <p>Total Amount: ${getTotal()}</p>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentForm;