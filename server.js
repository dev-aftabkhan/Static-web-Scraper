require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

//const authRoutes = require('./routes/authRoutes');
//const jobRoutes = require('./routes/jobRoutes');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//app.use('/api/auth', authRoutes);
//app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
