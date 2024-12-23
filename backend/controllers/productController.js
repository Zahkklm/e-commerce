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

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMobilePhones = async (req, res) => {
  try {
    const products = await Product.find({ category: 'mobile-phones' });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const likeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id; // Assumes auth middleware sets req.user

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.likes.includes(userId)) {
      return res.status(400).json({ error: 'Product already liked' });
    }

    product.likes.push(userId);
    await product.save();

    res.status(200).json({ 
      message: 'Product liked successfully', 
      likes: product.likes.length 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unlikeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.likes = product.likes.filter(id => !id.equals(userId));
    await product.save();

    res.status(200).json({ 
      message: 'Product unliked successfully',
      likes: product.likes.length 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLikes = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ count: product.likes.length });
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
  getProductsByCategory,
  getMobilePhones,
  likeProduct,
  unlikeProduct,
  getLikes
};