// This middleware checks if the user is an admin or not. Returns HTTP 403 code in case user role is not "admin".

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied, admin only' });
    }
    next();
  };
  
  module.exports = adminMiddleware;
  