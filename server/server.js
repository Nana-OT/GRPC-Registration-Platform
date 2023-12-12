const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
}));
  
// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/GR_Platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('MongoDB connected successfully');
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
  
  const User = mongoose.model('User', userSchema, 'Users');

  app.options('/api/login', cors()); // Enable preflight request for /api/login

  // Routes
  app.post('/api/login', cors(), async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Query the MongoDB collection for the user
      const user = await User.findOne({ username, password });
  
      if (user) {
        // Successful login
        res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        // Invalid credentials
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });