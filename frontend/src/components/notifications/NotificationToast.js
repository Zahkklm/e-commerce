const NotificationToast = ({ message, type = 'info', onClose }) => {
    return (
      <div className={`notification-toast ${type}`}>
        <p>{message}</p>
        <button onClick={onClose}>×</button>
      </div>
    );
  };
  
  export default NotificationToast;