const jwt = require('jsonwebtoken');

// Middleware to authenticate users using JWT tokens
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing' });
  }

  try {
    // Verify the token and attach the user to the request object
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified);
    req.user = verified;
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Token verification error: ", error);
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};


module.exports = authMiddleware;
