const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const appointmentRoutes = require('./routes/appointments'); 

const app = express();

app.use(cors());
app.use(express.json());

//  Register the appointment routes once
app.use('/api/appointments', appointmentRoutes);

//  Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

//  Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
// Updated comment to refresh commit message