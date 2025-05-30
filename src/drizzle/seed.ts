import db from "./db";
import { books } from "./schema";
async function seed() {
    console.log("==================Seeding Start==================");
    const [book1] = await db.insert(books).values({
        title: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "Dystopian"
    }).returning();
    const [book2] = await db.insert(books).values({
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        genre: "Fiction"
    }).returning();
    const [book3] = await db.insert(books).values({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        genre: "Classic"
    }).returning();
    console.log("Seeded books:", book1, book2, book3);
    console.log("==================Seeding Done==================");
    process.exit(0);
}

seed().catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
}
);