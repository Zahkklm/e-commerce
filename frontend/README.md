## Folder Structure
```
frontend/
├── public/
└── src/
    ├── components/
    │   ├── auth/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   └── Profile.js
    │   ├── products/
    │   │   ├── ProductList.js
    │   │   ├── ProductCard.js
    │   │   └── ProductFilter.js
    │   ├── cart/
    │   │   ├── Cart.js
    │   │   └── CartItem.js
    │   ├── payment/
    │   │   └── PaymentForm.js
    │   ├── common/
    │   │   ├── Header.js
    │   │   └── Footer.js
    │   └── notifications/
    │       └── Notification.js
    ├── context/
    │   ├── AuthContext.js
    │   └── CartContext.js
    ├── services/
    │   ├── api.js
    │   ├── authService.js
    │   └── productService.js
    ├── hooks/
    │   ├── useAuth.js
    │   └── useCart.js
    ├── utils/
    │   └── helpers.js
    ├── App.js
    ├── index.js
    └── Router.js
```