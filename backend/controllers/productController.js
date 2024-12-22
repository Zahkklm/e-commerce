const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products with pagination and filtering
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, minPrice, maxPrice, category } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' }; // Case-insensitive name search
    if (minPrice) filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
    if (category) filter.category = category; // Exact match for category

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({ total, page: parseInt(page), products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};