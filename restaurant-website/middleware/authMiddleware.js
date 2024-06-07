// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Log the decoded token for debugging
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error verifying token:', error); // Log the error for debugging
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { verifyToken, protect: verifyToken };
