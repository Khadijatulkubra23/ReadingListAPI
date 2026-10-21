const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const STATUSES = ["to-read", "reading", "finished"];

let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", status: "finished", rating: 5 },
  { id: 2, title: "Deep Work", author: "Cal Newport", status: "reading", rating: null },
  { id: 3, title: "The Pragmatic Programmer", author: "Andrew Hunt and David Thomas", status: "to-read", rating: null }
];

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Reading List API is running" });
});

app.get("/books", (req, res) => {
  const { status } = req.query;

  if (status !== undefined && !STATUSES.includes(status)) {
    return res.status(400).json({
      error: "Invalid query",
      details: [`status must be one of: ${STATUSES.join(", ")}`]
    });
  }

  const result = status ? books.filter((book) => book.status === status) : books;
  res.json(result);
});

app.get("/books/:id", (req, res) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).json({
      error: "Invalid id",
      details: ["id must be a whole number"]
    });
  }

  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({
      error: "Book not found",
      details: [`No book with id ${id}`]
    });
  }

  res.json(book);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});