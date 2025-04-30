import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyDtNYQQSnBCFF3VN8U8qwQi9Bfl7PvoVW0';

const generateWorkoutPlan = async () => {
  try {
    // Initialize the API with the key
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log('API Initialized'); // Debug log

    // Create a simple model instance
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log('Model Created'); // Debug log

    // Basic prompt
    const result = await model.generateContent({
      contents: [{ parts: [{ text: "Create a basic workout plan" }] }]
    });
    console.log('Content Generated'); // Debug log

    return result.response.text();
    
  } catch (error) {
    console.error("Generation Error Details:", {
      message: error.message,
      stack: error.stack,
      apiKey: API_KEY ? 'Present' : 'Missing'
    });
    throw new Error('Failed to generate workout plan. Please try again.');
  }
};

export default generateWorkoutPlan; 