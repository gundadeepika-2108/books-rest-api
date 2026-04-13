const express = require('express');
const app = express();

app.use(express.json());

// In-memory books array
let books = [
  { id: 1, title: "Harry Potter", author: "J.K Rowling" },
  { id: 2, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST add new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book by ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).send("Book not found");
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;

  res.send("Book updated successfully");
});

// DELETE book by ID
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).send("Book not found");
  }

  books.splice(bookIndex, 1);

  res.send("Book deleted successfully");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});