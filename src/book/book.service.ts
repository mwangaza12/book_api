import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TBookInsert, TBookSelect, books } from "../drizzle/schema";
 
 
//CRUD Operations for Book entity
 
 
//Get all Books
export const getBookServices = async():Promise<TBookSelect[] | null> => {
     return await  db.query.books.findMany();
}
 
//Get book by ID
export const getBookByIdServices = async(bookId: number):Promise<TBookSelect | undefined>=> {
      return await db.query.books.findFirst({
        where: eq(books.bookId,bookId)
      })
}
// Create a new book
export const createBookServices = async(book:TBookInsert):Promise<string> => {
       await db.insert(books).values(book).returning();
        return "Book Created Successfully 😎"
}
 
// Update an existing book
export const updateBookServices = async(bookId: number, book:TBookInsert):Promise<string> => {
    await db.update(books).set(book).where(eq(books.bookId,bookId));
    return "Book Updated Succeffully 😎";
}
 
 
export const deleteBookServices = async(bookId: number):Promise<string> => {
   await db.delete(books).where(eq(books.bookId,bookId));
   return "Book Delete Sucessfully";
}