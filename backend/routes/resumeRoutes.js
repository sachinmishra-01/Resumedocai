import express from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/analyzerController.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/analyze", upload.single("resume"), analyzeResume);

export default router;

