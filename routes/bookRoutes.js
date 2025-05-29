const express = require('express');
const router = express.Router();
const { scrapeBooks, getBooks, deleteAllBooks } = require('../controller/bookController');
const auth = require('../middleware/auth');
// Trigger scraping
router.post('/scrape', auth, scrapeBooks);

// Get all books
router.get('/get', auth, getBooks);
// Delete all books
router.delete('/delete', deleteAllBooks);

module.exports = router;
