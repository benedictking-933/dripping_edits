const jwt = require('jsonwebtoken');

// Middleware to verify JWT and attach user info
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Middleware to allow only admin users
exports.isAdmin = (req, res, next) => {
  // First verify token
  exports.verifyToken(req, res, () => {
    // Then check role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: admin access required' });
    }
    next();
  });
};
