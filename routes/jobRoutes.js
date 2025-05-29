const express = require('express');
const { scrapeJobs, getJobs } = require('../controller/jobController');
const auth = require('../middleware/auth');

const router = express.Router();
router.get('/scrape', auth, scrapeJobs);
router.get('/', auth, getJobs);

module.exports = router;
