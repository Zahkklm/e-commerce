import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="payment-success">
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
      <Link to="/" className="button">
        Continue Shopping
      </Link>
    </div>
  );
};

export default PaymentSuccess;