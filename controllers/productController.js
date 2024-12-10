const { Product } = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

// Get a specific product
const getProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const result = await Product.destroy({ where: { id: req.params.id } });
  result ? res.status(204).send() : res.status(404).json({ error: 'Product not found' });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};