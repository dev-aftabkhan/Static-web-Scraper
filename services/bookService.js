const Book = require('../models/Book');

const getAllBooks = async () => {
  const books = await Book.find({});
  console.log("📚 Books found:", books.length);
  console.log(books);
  return books;
};

const deleteAllBooks = async () => {
  await Book.deleteMany({});
};

module.exports = {
  getAllBooks,
  deleteAllBooks,
};
