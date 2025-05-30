import { z } from 'zod';

export const bookValidator = z.object({
    bookId: z.number().int().optional(),
    title: z.string().min(5, 'Title should be at least 5 characters long'),
    author: z.string().min(5, 'Author should be at least 5 characters long'),
    year: z.number().int().min(0, 'Year must be a positive integer'),
    genre: z.string().min(5, 'Genre should be at least 5 characters long'),
}).strict();