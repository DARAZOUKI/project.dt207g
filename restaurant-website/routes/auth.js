const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = [
    { username: 'user', password: 'password', role: 'user' },
    { username: 'superuser', password: 'superpass', role: 'admin' }
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    try {
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
