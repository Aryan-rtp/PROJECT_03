require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});



async function captionCreation(base64ImageFile) {
  
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Create funny caption in one line only in Hinglish" },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
    });
    return response.text
}

module.exports=captionCreation
