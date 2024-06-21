/**
 * This file contains the implementation of a simple server using Express.js.
 * The server provides endpoints for creating, retrieving, updating, and deleting books.
 */

import { Book, Books } from '../../types';
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// A temporary in-memory "database"
let books: Books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: '1925', genre: 'Novel' },
  { id: 2, title: 'Great Expectations', author: 'Charles Dickens', year: '1861', genre: 'Novel' },
  { id: 3, title: 'Hard Times', author: 'Charles Dickens', year: '1854', genre: 'Novel' },
  { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: '1951', genre: 'Novel' },
  { id: 5, title: 'The Bell Jar', author: 'Sylvia Plath', year: '1963', genre: 'Novel' },
  { id: 6, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', year: '1890', genre: 'Novel' },
  { id: 7, title: 'The Sun Also Rises', author: 'Ernest Hemingway', year: '1926', genre: 'Novel' },
];

app.use(express.json());

/**
 * Create a new book.
 * @param req - The request object containing the book details.
 * @param res - The response object to send the result.
 */
app.post('/books', (req: { body: Book; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
  const { title, author, year, genre } = req.body;
  if (!title || !author || !year || !genre) {
    return res.status(400).send('Missing one or more required fields. { title, author, year, genre }');
  }

  const newBook = { id: Math.floor(1000 + Math.random() * 9000), title, author, year, genre };
  books.push(newBook);
  res.status(201).send(`Book added with ID: ${newBook.id}`);
});

/**
 * Get all books.
 * @param req - The request object.
 * @param res - The response object to send the result.
 */
app.get('/books', (req: any, res: { json: (arg0: Book[]) => void; }) => {
  res.json(books);
});

/**
 * Get a single book by ID.
 * @param req - The request object containing the book ID.
 * @param res - The response object to send the result.
 */
app.get('/books/:id', (req: { params: { id: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; }; json: (arg0: Book) => void; }) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('Book not found');
  }
  res.json(book);
});

/**
 * Update a book by ID.
 * @param req - The request object containing the book ID and updated details.
 * @param res - The response object to send the result.
 */
app.put('/books/:id', (req: { params: { id: string; }; body: Book; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; }; send: (arg0: Book) => void; }) => {
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

/**
 * Delete a book by ID.
 * @param req - The request object containing the book ID.
 * @param res - The response object to send the result.
 */
app.delete('/books/:id', (req: { params: { id: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string | undefined): void; new(): any; }; }; }) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }

  books.splice(bookIndex, 1);
  res.status(204).send(`Book deleted with ID: ${req.params.id}`);
});

module.exports = app;