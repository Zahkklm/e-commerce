
---

## **Authentication**

### **User Endpoints**

| Endpoint       | Method | Description       | Protected |
|----------------|--------|-------------------|-----------|
| `/users/register` | POST   | Register a new user | No        |
| `/users/login`    | POST   | Log in a user       | No        |

---

## **Product Management**

### **Product Endpoints**

| Endpoint    | Method | Description              | Protected |
|-------------|--------|--------------------------|-----------|
| `/products` | GET    | Get all products         | No        |
| `/products/:id` | GET | Get a single product     | No        |
| `/products` | POST   | Add a new product        | Yes (Admin) |
| `/products/:id` | PATCH | Update a product       | Yes (Admin) |
| `/products/:id` | DELETE | Delete a product      | Yes (Admin) |

---

## **Order Management**

### **Order Endpoints**

| Endpoint    | Method | Description                 | Protected |
|-------------|--------|-----------------------------|-----------|
| `/orders`   | POST   | Place a new order           | Yes       |
| `/orders`   | GET    | Get all orders for a user   | Yes       |
| `/orders/:id` | GET  | Get details of a single order | Yes    |
| `/orders/:id` | PATCH | Update order status (Admin) | Yes (Admin) |
| `/orders/:id` | DELETE | Delete an order           | Yes (Admin) |

---

## **Invoice Management**

### **Invoice Endpoints**

| Endpoint      | Method | Description                 | Protected |
|---------------|--------|-----------------------------|-----------|
| `/invoices`   | POST   | Create a new invoice        | Yes (Admin) |
| `/invoices`   | GET    | Get all invoices            | Yes (Admin) |
| `/invoices/:id` | GET  | Get details of a single invoice | Yes (Admin) |
| `/invoices/:id` | PATCH | Update an invoice          | Yes (Admin) |
| `/invoices/:id` | DELETE | Delete an invoice         | Yes (Admin) |

---

## **Middleware**

### **Protected Routes**

Some routes require authentication or specific roles. Use the following middleware to secure your routes:

- **`authenticateUser`**: Ensures the user is logged in.
- **`authorizeRoles('admin')`**: Restricts access to admin users.

---

## **Usage**

1. Clone the repository.
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables in a .env file like this:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/e-commerce-db
JWT_SECRET=jwtsecretkeyhere201144
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_password_or_app_password
EMAIL_FROM=your_email@gmail.com
```
4. Start the server:
```
npm start
```