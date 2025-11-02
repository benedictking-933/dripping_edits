const { supabase } = require('../config/supabaseClient');

// Add new product
const addProduct = async (req, res) => {
  const { name, description, price, in_stock, image_url } = req.body;

  const { data, error } = await supabase
    .from('products')
    .insert([{ name, description, price, in_stock, image_url }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Product added', product: data[0] });
};

// Get all products
const getProducts = async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Get product by id
const getProductById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error: 'Product not found' });
  res.json(data);
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase.from('products').update(updates).eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Product updated', product: data[0] });
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase.from('products').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Product deleted' });
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
