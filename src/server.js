const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/order');

const app = express();
const PORT = process.env.PORT || 4200;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', orderRoutes); // API endpoint for orders

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/invendata', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
