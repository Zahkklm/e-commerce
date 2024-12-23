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
const shipmentRoutes = require('./routes/shipmentRoutes');
const returnRoutes = require('./routes/returnRoutes');

const cors = require('cors');
const PORT = process.env.PORT || 5000;
const path = require('path');

// MongoDB connection
connectDB();

// Middleware

// ...existing imports...

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());


// Serve static files from React build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API Routes should be before the catch-all route
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/returns', returnRoutes);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// TODO: Add error handler middleware 
// app.use(errorHandler); // Custom error handler to capture and format errors

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Server listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
