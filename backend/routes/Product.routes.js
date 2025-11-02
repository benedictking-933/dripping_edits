const express = require('express');
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/Product.controllers');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/',  addProduct);
router.put('/:id', updateProduct);
router.delete('/:id',  deleteProduct);

module.exports = router;
