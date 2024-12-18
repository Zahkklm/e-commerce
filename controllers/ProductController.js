// This file contains the functions for creating and getting all products.

const Product = require('../models/Product');

// createProduct function creates a new product and saves it to the database.

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// getAllProducts function gets all products with pagination and filtering.

const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, minPrice, maxPrice } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' }; // Case-insensitive name search
    if (minPrice) filter.price = { $gte: parseFloat(minPrice) };
    if (maxPrice) filter.price = { $lte: parseFloat(maxPrice) };

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({ total, page: parseInt(page), products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct, getAllProducts };