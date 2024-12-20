// Middleware for role-based access control
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized, no user found' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied, insufficient role' });
        }
        next(); // Proceed to the next middleware/route handler
    };
};

module.exports = authorizeRoles;