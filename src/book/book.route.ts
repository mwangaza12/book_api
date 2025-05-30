import { Router } from "express";
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "./book.controller";
import { validateBook } from "../middleware/validateBook";
 
export const bookRouter = Router();
 
// Book routes definition
 
 
// Get all books
bookRouter.get('/books', getBooks);
 
// Get book by ID
bookRouter.get('/books/:id', getBookById);
 
// Create a new book
bookRouter.post('/books',validateBook, createBook);
 
// Update an existing book
bookRouter.put('/books/:id',validateBook, updateBook);
 
// Delete an existing book
bookRouter.delete('/books/:id', deleteBook);