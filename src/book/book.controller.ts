import { Request, Response } from "express";
import { createBookServices, deleteBookServices, getBookByIdServices, getBookServices, updateBookServices } from "./book.service";
 
//Business logic for book-related operations
 
 
export const getBooks = async (req: Request, res: Response) => {
    try {
        const allBooks = await getBookServices();
        if (allBooks == null || allBooks.length == 0) {
          res.status(404).json({ message: "No books found" });
        }else{
            res.status(200).json(allBooks);            
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch books" });
    }
}
 

export const getBookById = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
        res.status(400).json({ error: "Invalid book ID" });
         return; // Prevent further execution
    }
    try {
        const book = await getBookByIdServices(bookId);
        if (book == undefined) {
            res.status(404).json({ message: "Book not found" });
        } else {
            res.status(200).json(book);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch book" });
    }
}
 
export const createBook = async (req: Request, res: Response) => {
    const { title, author, year, genre } = req.body;
    if (!title || !author || !year || !genre) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const newBook = await createBookServices({ title, author, year, genre });
        if (newBook == null) {
            res.status(500).json({ message: "Failed to create book" });
        } else {
            res.status(201).json({message: newBook});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to create book" });
    }
}
 
export const updateBook = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
        res.status(400).json({ error: "Invalid book ID" });
        return; // Prevent further execution
    }
    const { title, author, year, genre } = req.body;
    if (!title || !author || !year || !genre) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const updatedBook = await updateBookServices(bookId, { title, author, year, genre });
        if (updatedBook == null) {
            res.status(404).json({ message: "Book not found or failed to update" });
        } else {
            res.status(200).json({mesage: updatedBook});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update book" });
    }
}
 
 
 
export const deleteBook = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);  
    if (isNaN(bookId)) {
        res.status(400).json({ error: "Invalid book ID" });
        return; // Prevent further execution
    }
    try {
        const deletedBook = await deleteBookServices(bookId);
        if (deletedBook) {
            res.status(200).json({ message: "Book deleted successfully" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed to delete Book" });
    }    
}
 