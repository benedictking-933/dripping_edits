const express = require('express');
const router = express.Router();
const { signup, login, resetPassword,forgotPassword } = require('../controllers/Auth-controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);


// Password reset
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
// Example protected route
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Protected route accessed', user: req.user });
});

module.exports = router;
