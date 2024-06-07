// routes/protected.js

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

// Debugging: Check if verifyToken is defined
console.log('verifyToken middleware:', verifyToken);

// Protected route
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully', user: req.user });
});

module.exports = router;
