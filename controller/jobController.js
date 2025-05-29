const { spawn } = require('child_process');
const { getAllJobs } = require('../services/jobService');

exports.scrapeJobs = async (req, res) => {
  const process = spawn('python3', ['scraper/scrape_jobs.py']);

  process.stdout.on('data', data => console.log(`stdout: ${data}`));
  process.stderr.on('data', data => console.error(`stderr: ${data}`));

  process.on('close', async (code) => {
    if (code === 0) {
      const jobs = await getAllJobs();
      res.json({ message: "Scraping completed", jobs });
    } else {
      res.status(500).send("Scraping failed");
    }
  });
};

exports.getJobs = async (req, res) => {
  const jobs = await getAllJobs();
  res.json(jobs);
};
