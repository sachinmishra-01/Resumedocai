// backend/server.js

import express from "express";
import multer from "multer";
import cors from "cors"; // <<< Import cors middleware
import dotenv from 'dotenv'; // <<< Import dotenv for environment variables

import analyzerController from "./controllers/analyzerController.js";

// Load environment variables from .env file
dotenv.config(); // <<< Configure dotenv

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Enable CORS for all origins (for development)
// This is crucial to fix the CORS error you're getting
app.use(cors()); // <<< Use the cors middleware

// Middleware to parse JSON bodies (good practice for other potential routes)
app.use(express.json());

// Your route for resume analysis
app.post("/api/analyze", upload.single("resume"), analyzerController);

// Simple route to check if the server is running
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});