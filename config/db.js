const mongoose = require('mongoose');

// Replace with your MongoDB URI
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommercedb';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
