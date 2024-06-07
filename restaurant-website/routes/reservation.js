//routes/reservation.js

const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Get all reservations
router.get('/', protect, async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add a reservation
router.post('/', async (req, res) => {
    const { name, phone, date, time, guests } = req.body;
    if (!name || !phone || !date || !time || !guests) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const reservation = await Reservation.create({ name, phone, date, time, guests });
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a reservation
router.delete('/:id', protect, async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Reservation deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

