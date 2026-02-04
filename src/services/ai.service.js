require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});

async function main() {
  const response = await ai.models.generateContentStream({
    model: "gemini-3-flash-preview",
    contents: "Explain how AI works",
  });

  for await (const chunk of response) {
    console.log(chunk.text);
  }
}
main();