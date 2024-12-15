Run `node app.js` to launch backend

## Endpoints

POST /api/users/register - Create a new user.
GET /api/users/ - Fetch all users.
POST /api/products/ - Create a new product.
GET /api/products/ - Fetch all products.

## Folder Structure

```
ecommerce-app/
├── controllers/
│   ├── productController.js
│   └── userController.js
├── models/
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── productRoutes.js
│   └── userRoutes.js
├── app.js
├── config/
│   └── db.js
├── package.json
└── README.md

```