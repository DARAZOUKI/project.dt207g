// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Debugging
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);


// Routes
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protected'); 
const menuRoutes = require('./routes/menu');
const reservationRoutes = require('./routes/reservation');

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoute); 
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML files
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/reservation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Admin.html')); 
});
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
