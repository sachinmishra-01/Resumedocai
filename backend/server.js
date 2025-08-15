import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from 'dotenv';

// Import local modules using ES Module syntax
import authRoutes from './routes/authRoutes.js';
import analyzerController from "./controllers/analyzerController.js";
import { protect } from './middleware/authMiddleware.js'; // This is already here, which is correct
// Assuming you have this middleware from our previous discussion
import { errorHandler } from "./middleware/errorMiddleware.js"; 
import connectDB from './config/db.js'; // Assuming you have a DB connection file

// Load environment variables from .env file at the very top
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// --- Middleware ---
// Enable CORS for all origins
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes); // Authentication routes

// --- THIS IS THE LINE TO CHANGE ---
// Add the 'protect' middleware right after the path.
// This ensures the user is logged in before they can upload a resume.
app.post("/api/analyze", protect, upload.single("resume"), analyzerController);

// Simple route to check if the server is running
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// --- Error Handling Middleware ---
// This should be the last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});