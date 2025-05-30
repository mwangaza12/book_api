// db/schema.ts
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
    bookId: serial('id').primaryKey(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    year: integer('year').notNull(),
    genre: text('genre').notNull()
});

export type TBookInsert = typeof books.$inferInsert;
export type TBookSelect = typeof books.$inferSelect;