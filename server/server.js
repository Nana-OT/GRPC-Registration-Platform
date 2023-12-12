const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { authenticate } = require('./middleware/authMiddleWare');


const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/GR_Platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

// Middleware
app.use(bodyParser.json());

// User model
const User = require('./models/User');

//protected routes
app.get('/protected-route', authenticate, (req, res) => {
    res.json({ message: 'This route is protected!' });
  });

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
