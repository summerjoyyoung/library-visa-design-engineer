const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/name', (_req: any, res: { send: (arg0: { name: string; }) => void; }) => {
  res.send({name: 'Summer'});
});

type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
};

// A temporary in-memory "database"
let books: Array<Book> = [];

app.use(express.json());

// Create a Book
app.post('/books', (req: { body: { title: any; author: any; year: any; genre: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
  const { title, author, year, genre } = req.body;
  if (!title || !author || !year || !genre) {
    return res.status(400).send('Missing title or author');
  }

  const newBook = { id: books.length + 1, title, author, year, genre };
  books.push(newBook);
  res.status(201).send(`Book added with ID: ${newBook.id}`);
});

// Get All Books
app.get('/books', (req: any, res: { json: (arg0: Book[]) => void; }) => {
  res.json(books);
});

// Get a Single Book
app.get('/books/:id', (req: { params: { id: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; }; json: (arg0: Book) => void; }) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
if (!book) {
  return res.status(404).send('Book not found');
}
res.json(book);
});

// Update a Book
app.put('/books/:id', (req: { params: { id: string; }; body: { title: any; author: any; year: any; genre: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; }; send: (arg0: Book) => void; }) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('Book not found');
  }

  const { title, author, year, genre } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  book.year = year || book.year;
  book.genre = genre || book.genre;

  res.send(book);
});

// Delete a Book
app.delete('/books/:id', (req: { params: { id: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string | undefined): void; new(): any; }; }; }) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }

  books.splice(bookIndex, 1);
  res.status(204).send(`Book deleted with ID: ${req.params.id}`);
});

module.exports = app;