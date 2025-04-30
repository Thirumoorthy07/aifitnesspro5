// API Keys and Configuration
export const config = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  // Add other configuration settings here
};

// Validate that required environment variables are set
if (!config.apiKey) {
  console.error('Missing required environment variable: REACT_APP_GOOGLE_API_KEY');
} 