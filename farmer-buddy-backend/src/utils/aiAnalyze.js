import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API); 

// 2. Use a valid model name (gemini-3.1 does not exist yet)
const MODEL_NAME = "gemini-3.1-flash-lite"; 

const getAiResponse = async (previousPrompt = "", prompt, imageUrl = "") => {
  const model = ai.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: `You are a helpful farming assistant for Indian farmers.
Always reply in the same native Indian language the user writes in (e.g., Hindi, Tamil, Telugu, Marathi, Bengali, Kannada, Punjabi, etc.).

CRITICAL VISUAL RULE:
If an image is provided, it represents the CURRENT image the user is asking about.
- You MUST analyze this specific new image.
- DO NOT assume it is the same image as in the 'previous conversation'.
- DO NOT use the 'previous conversation' to guess what the current image contains.
- If the user asks "what is this plant" or "what is the disease", they are asking about the NEW image provided.

First, look at the CURRENT question and the CURRENT image (if any) by themselves.
If they are not about farming or agriculture, do not answer them. Reply only that you can help with farming, in the user's native Indian language.

Each request contains a PREVIOUS_SUMMARY of the conversation so far (it may be empty).
1. Use PREVIOUS_SUMMARY only as text context (background info).
2. After answering, write an UPDATED summary: merge PREVIOUS_SUMMARY with what was discussed in this turn. Keep it short (max 5 sentences).

Additionally, if the user asks for a prediction or assessment (e.g., crop health, disease risk, yield potential) and the information provided is sufficient to make a clear determination, you must provide a confidence level.
- Use "green" if the prediction is fully approved/positive/healthy.
- Use "yellow" if the prediction is moderate/needs attention/uncertain.
- Use "red" if the prediction is bad/negative/critical.
If no prediction is requested or there isn't enough information, set confidence to "none".

Return ONLY valid JSON in this exact format:
{"reply": "your answer as a plain text string in the user's native Indian language", "summary": "the updated summary", "confidence": "green" | "yellow" | "red"}`,
  });

  const textPrompt = `PREVIOUS_SUMMARY: ${previousPrompt || "None"}\n\nCURRENT QUESTION: ${prompt}\n\nIMPORTANT: Analyze ONLY the new image attached to this message. Ignore any images from the previous summary.`;


  const contents = [];

  if (imageUrl) {
    try {

      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      const mimeType = imageResponse.headers.get("content-type") || "image/jpeg";

      contents.push({
        role: "user",
        parts: [
          { text: textPrompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch image:", error);

      contents.push({ role: "user", parts: [{ text: textPrompt }] });
    }
  } else {
    contents.push({
      role: "user",
      parts: [{ text: textPrompt }],
    });
  }

  const response = await model.generateContent({
    contents: contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  });

  return response.response.text();
};

export { getAiResponse };