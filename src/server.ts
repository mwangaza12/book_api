import express, { Application, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import {logger} from "./middleware/logger";
import { bookRouter } from "./book/book.route";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Basic Middleware
app.use(cors({
  origin: ['http://localhost:5173','https://book-app-react-mocha.vercel.app/']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Default route
app.get("/", (req, res: Response) => {
  res.send("Welcome to Book API Backend with Drizzle ORM and PostgreSQL");
});

// Mount routers with specific prefixes
app.use('/api',bookRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
