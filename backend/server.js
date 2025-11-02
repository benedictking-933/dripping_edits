const express = require("express");
const cors = require("cors");
const { supabase } = require("./supabaseClient");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// ------------------------- AUTHENTICATION -------------------------

// Register a new user
app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error;
    res.json({ message: "User registered successfully", user: data.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login user
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    res.json({ message: "Login successful", session: data.session });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Middleware to protect routes
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return res.status(401).json({ error: "Unauthorized" });

  req.user = data.user;
  next();
};

// ------------------------- PRODUCTS -------------------------

app.get("/api/products", async (req, res) => {
  const { category, search } = req.query;
  let query = supabase.from("products").select("*");

  if (category) query = query.eq("category", category);
  if (search) query = query.or(`name.ilike.%${search}%,category.ilike.%${search}%`);

  const { data, error } = await query;

  if (error) return res.status(400).json({ error });
  res.json(data);
});

app.post("/api/products", authenticate, async (req, res) => {
  const { name, description, price, image_url, category, rating, rating_count, rating_url } = req.body;

  const { data, error } = await supabase
    .from("products")
    .insert([{ name, description, price, image_url, category, rating, rating_count, rating_url }])
    .select();

  if (error) return res.status(400).json({ error });
  res.json(data);
});

app.delete("/api/products/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error });
  res.json(data);
});

// ------------------------- CART -------------------------

app.get("/api/cart", authenticate, async (req, res) => {
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from("cart_items")
    .select(`id, quantity, product_id (id, name, price, image_url, category, rating)`)
    .eq("user_id", user_id);

  if (error) return res.status(400).json({ error });
  res.json(data);
});

app.post("/api/cart/add", authenticate, async (req, res) => {
  const user_id = req.user.id;
  const { product_id, quantity } = req.body;

  try {
    const { data: existing } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user_id)
      .eq("product_id", product_id)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + quantity })
        .eq("id", existing.id)
        .select();

      if (error) throw error;
      return res.json(data[0]);
    }

    const { data, error } = await supabase
      .from("cart_items")
      .insert([{ user_id, product_id, quantity }])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/cart/update", authenticate, async (req, res) => {
  const { id, quantity } = req.body;

  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error });
  res.json(data);
});

app.delete("/api/cart/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error });
  res.json(data);
});
const payRoutes = require('./routes/pay');
app.use('/api/pay', payRoutes);


// ------------------------- EXPORT APP -------------------------
module.exports = app;
