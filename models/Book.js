const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String },
  availability: { type: String },
  rating: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema, "books");
