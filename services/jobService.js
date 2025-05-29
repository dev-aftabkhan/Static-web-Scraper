const Job = require('../models/Job');

// Save multiple jobs to MongoDB
const saveJobs = async (jobs) => {
  try {
    // Optional: remove existing jobs (if needed)
    // await Job.deleteMany({});

    // Bulk insert
    await Job.insertMany(jobs);
    console.log("✅ Jobs inserted successfully");
  } catch (error) {
    console.error("❌ Error inserting jobs:", error);
    throw error;
  }
};

// Fetch all jobs from DB
const getAllJobs = async () => {
  return await Job.find().sort({ createdAt: -1 });
};

module.exports = {
  saveJobs,
  getAllJobs,
};
