const { spawn } = require('child_process');
const { getAllBooks, deleteAllBooks } = require('../services/bookService');

exports.scrapeBooks = async (req, res) => {
  try {
    // Optional: clear existing books before scraping fresh data
    await deleteAllBooks();

    const pythonProcess = spawn('python', ['scraper/scrape_books.py']);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

    pythonProcess.on('close', async (code) => {
      if (code === 0) {
        const books = await getAllBooks();
        res.json({ message: 'Scraping completed successfully', books });
      } else {
        res.status(500).json({ error: 'Scraper process exited with error code ' + code });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during scraping' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }

};

exports.deleteAllBooks = async (req, res) => {
  try {
    await deleteAllBooks();
    res.json({ message: 'All books deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete books' });
  }
};
