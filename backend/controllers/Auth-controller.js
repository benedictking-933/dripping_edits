const { supabase } = require('../config/supabaseClient');
const jwt = require('jsonwebtoken');

// Sign up a user
exports.signup = async (req, res) => {
  const { email, password, name, role } = req.body; // role can be 'admin' or 'user'

  try {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name, role: role || 'user' } } });
    if (error) throw error;

    res.status(201).json({ message: 'User registered', data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const user = data.user;

    // Get user metadata including role
    const role = user.user_metadata?.role || 'user';

    const token = jwt.sign(
      { id: user.id, email: user.email, role }, // include role in JWT
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { newPassword, access_token } = req.body;

  if (!newPassword || !access_token) {
    return res.status(400).json({ error: 'New password and access token are required.' });
  }

  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabaseTemp = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        global: {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      }
    );

    const { data, error } = await supabaseTemp.auth.updateUser({ password: newPassword });
    if (error) throw error;

    res.status(200).json({ message: 'Password reset successful', data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password',
    });
    if (error) throw error;

    res.status(200).json({
      message: 'Password reset email sent. Please check your inbox.',
      data,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
