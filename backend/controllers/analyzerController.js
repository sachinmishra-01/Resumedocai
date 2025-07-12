// backend/controllers/analyzerController.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// --- NEW PDF IMPORTS ---
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'; // Use the mjs version for ESM
import { Canvas, createCanvas, Image, ImageData } from 'canvas'; // Required for pdfjs-dist in Node.js
// Set up PDF.js worker (important for performance and avoiding main thread blocking)
pdfjsLib.GlobalWorkerOptions.workerSrc = `pdfjs-dist/legacy/build/pdf.worker.mjs`;

// Provide PDF.js with a minimal DOM-like environment for canvas operations
// This is a workaround for pdfjs-dist expecting a browser environment
global.Buffer = global.Buffer || require('buffer').Buffer; // Ensure Buffer is available
Object.assign(global, { Canvas, Image, ImageData });
// --- END NEW PDF IMPORTS ---


// Load environment variables from .env file
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set in the .env file!");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


const analyzerController = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // --- NEW: Extract text from PDF buffer using pdfjs-dist ---
        let resumeText = '';
        try {
            const pdfData = new Uint8Array(file.buffer);
            const loadingTask = pdfjsLib.getDocument({ data: pdfData });
            const pdfDocument = await loadingTask.promise;

            const numPages = pdfDocument.numPages;
            for (let i = 1; i <= numPages; i++) {
                const page = await pdfDocument.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                resumeText += pageText + '\n'; // Add newline between pages
            }

            if (!resumeText || resumeText.trim() === "") {
                return res.status(400).json({ error: "Could not extract text from the PDF. The PDF might be image-based or empty." });
            }
            console.log("Successfully extracted text from PDF using pdfjs-dist.");
            // console.log("Extracted Resume Text (first 500 chars):\n", resumeText.substring(0, 500)); // For debugging
        } catch (pdfError) {
            console.error("Error extracting text from PDF with pdfjs-dist:", pdfError.message);
            // console.error(pdfError); // Log full error for more details
            return res.status(500).json({ error: "Failed to extract text from the uploaded PDF file using pdfjs-dist." });
        }
        // --- END NEW PDF EXTRACTION ---

        const prompt = `You are an expert resume analyzer. Your task is to analyze the following resume text.
        Please provide a professional analysis based on ATS checker, for every section use 15-20 words, formatted strictly as a JSON object.

        The JSON object must have the following keys:
        1.  "score": (number) A numerical score out of 100, representing the overall quality and effectiveness of the resume.
        2.  "summary": (string) A concise summary of the resume's main strengths and weaknesses.
        3.  "problems": (array of strings) A list of specific areas for improvement. Each item should be a clear, actionable problem statement.
        4.  "solutions": (array of strings) A list of practical solutions corresponding to each problem identified. Each solution should directly address a problem.
        5.  "highlights": (array of strings) A list of key strengths or strong points of the resume.

        Ensure the output is a single, valid JSON object and contains no other text or formatting outside of the JSON. Do NOT wrap the JSON in markdown code blocks (e.g., \`\`\`json). Just output the pure JSON.

        Resume Text to Analyze:
        """
        ${resumeText}
        """
        `;

        console.log(`Sending prompt to Gemini with model '${model.model}'...`);
        const result = await model.generateContent(prompt);
        console.log("Received response from Gemini.");
        const response = result.response;
        let text = response.text();

        // Remove markdown fences from Gemini's response
        if (text.startsWith('```json')) {
            text = text.substring(7);
        }
        if (text.endsWith('```')) {
            text = text.substring(0, text.length - 3);
        }
        text = text.trim();

        console.log("Cleaned Gemini Response Text (before JSON.parse):");
        console.log(text);

        let parsedResult;
        try {
            parsedResult = JSON.parse(text);
        } catch (jsonError) {
            console.error("Failed to parse Gemini response as JSON:", jsonError);
            console.error("Gemini raw response (partial):", text.substring(0, 500) + (text.length > 500 ? '...' : ''));
            return res.status(500).json({
                error: "AI analysis failed: Gemini did not return valid JSON.",
                details: "Please check the console for the raw AI response and JSON parsing error. It might be due to a malformed response from the model.",
                rawResponseSnippet: text.substring(0, 500)
            });
        }

        if (
            typeof parsedResult.score !== 'number' ||
            typeof parsedResult.summary !== 'string' ||
            !Array.isArray(parsedResult.problems) ||
            !Array.isArray(parsedResult.solutions) ||
            !Array.isArray(parsedResult.highlights)
        ) {
            console.warn("Gemini response did not match expected JSON structure:", parsedResult);
            return res.status(500).json({
                error: "AI analysis returned an unexpected data structure.",
                details: "The JSON was parsed, but its structure was not as expected (e.g., missing keys, wrong types).",
                parsedData: parsedResult
            });
        }

        res.json(parsedResult);

    } catch (error) {
        console.error("Resume analysis failed:", error);
        if (error.name === 'GoogleGenerativeAIFetchError' && error.status) {
            console.error(`Gemini API Error - Status: ${error.status}, Details: ${error.statusText}`);
            res.status(error.status).json({
                error: `Gemini API Error: ${error.statusText || error.message}`,
                details: `Error calling the Gemini API. Status code: ${error.status}. Please check your API key, model access, and network connection.`,
                geminiErrorDetails: error.errorDetails
            });
        } else {
            res.status(500).json({
                error: "Internal server error during AI analysis.",
                details: error.message
            });
        }
    }
};

export default analyzerController;