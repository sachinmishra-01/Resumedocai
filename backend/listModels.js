import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set in the .env file!");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listAllModels() {
    try {
        console.log("Fetching available Gemini models...");
        // Use the listModels() method from the generative AI client
        const { models } = await genAI.listModels();

        console.log("\n--- Available Gemini Models ---");
        if (models.length === 0) {
            console.log("No models found for this API key. Please check your API key and permissions.");
        }
        for (const model of models) {
            console.log(`Name: ${model.name}`);
            console.log(`  Description: ${model.description || 'N/A'}`);
            console.log(`  Supported Generation Methods: ${model.supportedGenerationMethods ? model.supportedGenerationMethods.join(', ') : 'N/A'}`);
            console.log(`  Input Token Limit: ${model.inputTokenLimit || 'N/A'}`);
            console.log(`  Output Token Limit: ${model.outputTokenLimit || 'N/A'}`);
            console.log(`  Version: ${model.version || 'N/A'}`);
            console.log('------------------------------------');
        }
        console.log("\n--- End of Models List ---");

    } catch (error) {
        console.error("Error fetching models:", error);
        if (error.status === 401) {
            console.error("Possible API Key issue. Please check your GEMINI_API_KEY in .env. It might be invalid or improperly configured.");
        } else {
            console.error("A network or server error occurred.");
        }
    }
}

listAllModels();