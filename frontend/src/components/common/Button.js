const Button = ({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    disabled = false 
  }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`button ${variant}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;