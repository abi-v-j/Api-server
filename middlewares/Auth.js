
const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {
    // Check if token exists in headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Extract the token from the "Bearer <token>" format
        const tokenParts = token.split(' ');
        const bearerToken = tokenParts[1];

        // Verify token
        const decoded = jwt.verify(bearerToken,  config.get('jwtSecret')); // Replace 'yourSecretKey' with your actual secret key

        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;