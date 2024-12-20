require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authMiddleware  = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
// const errorHandler = require('./middleware/errorMiddleware'); // Assuming an error handler middleware exists
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./config/swagger-output.json'); // Generated file


const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB();

// Middleware
app.use(bodyParser.json());


// API Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/orders', orderRoutes); // Order routes
app.use('/api/invoices', invoiceRoutes); // Invoice routes

// TODO: Add error handler middleware 
// app.use(errorHandler); // Custom error handler to capture and format errors


// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Server listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
