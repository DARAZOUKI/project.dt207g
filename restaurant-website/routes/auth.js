//routes/auth.js

const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Temporary register route for creating an admin user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
         // Hash the password before saving the user
         const hashedPassword = await bcrypt.hash(password, 10);
         const user = new User({ username, password: hashedPassword });
         await user.save();
        res.status(201).json({ message: 'Admin user created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
