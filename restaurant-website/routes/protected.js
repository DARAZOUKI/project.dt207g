// routes/protected.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Debugging: Check if protect is defined
console.log('Protect middleware:', protect);

// Protected route
router.get('/protected', protect, (req, res) => {
    res.json({ message: 'Protected route accessed successfully', user: req.user });
});

module.exports = router;
