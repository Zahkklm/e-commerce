require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // MongoDB connection

app.use(bodyParser.json());

app.use('/api/users', userRoutes); // user routes
app.use('/api/products', productRoutes); // product routes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
