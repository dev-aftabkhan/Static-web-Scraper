const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try{
    console.log("✅ Connected to MongoDB");
    console.log("Connected DB:", mongoose.connection.name);  // Debug
  }
  catch{(err) => console.error("❌ MongoDB connection error:", err)};
};

module.exports = connectDB;
