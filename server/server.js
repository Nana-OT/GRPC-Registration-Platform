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

  const memberSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: String,
    gender: [String],
  });
  
  // Create a Member model
  const Member = mongoose.model('Member', memberSchema, 'Members'); //

  // Enable preflight request for routes
  app.options('/api/login', cors()); 
  app.options('/api/add-member', cors());
  app.options('/api/get-entries', cors());

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

  // Route to add a member
  app.post('/api/add-member', cors(), async (req, res) => {
    const { firstName, lastName, phoneNumber, address, gender } = req.body;

    try {
      // Create a new Member instance
      const newMember = new Member({
        firstName,
        lastName,
        phoneNumber,
        address,
        gender,
      });

      // Save the new member to the database
      await newMember.save();

      res.status(201).json({ success: true, message: 'Member added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  app.get('/api/get-entries', cors(), async (req, res) => {
    try {
      const entries = await Member.find({});
      res.status(200).json({ success: true, entries });
    } catch (error) {
      console.error('Error fetching entries:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  app.delete('/api/remove-member', cors(), async (req, res) => {
    const { firstName, lastName } = req.body;
  
    try {
      // Remove the member from the Member collection
      await Member.deleteOne({ firstName, lastName });
  
      res.status(200).json({ success: true, message: 'Member removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });