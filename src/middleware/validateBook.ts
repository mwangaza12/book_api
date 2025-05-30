import { NextFunction, Request, Response } from "express";
import { bookValidator } from "../validation/book.validator";

export const validateBook = (req : Request, res : Response, next : NextFunction) => {
    const validationResult = bookValidator.safeParse(req.body);
    
    if (!validationResult.success) {
        res.status(400).json({
            error: "Invalid request data",
            details: validationResult.error.errors
        });
        return;
    }
    
    req.body = validationResult.data; 
    next();
};