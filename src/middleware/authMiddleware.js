const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    // Get token from request headers
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded; // Add decoded user object to request object
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ error: 'Invalid token.' });
    }
};
exports.verifyCustomerTokenForHomeScreen = (req, res, next) => {
    // Get token from request headers
    const token = req.headers.authorization;
    try {
        // Verify token
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        req.user = {};
        next();
    }
};

