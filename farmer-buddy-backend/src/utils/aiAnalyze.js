import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
const Model = "gemini-3.1-flash-lite";
const getAiResponse = async (previousPromt="", prompt, imageUrl = "") => {
  const fullPrompt = imageUrl
    ? `previous conversation is ${previousPromt} new prompt is ${prompt}\n\nImage URL: ${imageUrl}`
    : `previous conversation is ${previousPromt} new prompt is ${prompt}`;
  const response = await ai.models.generateContent({
    model: Model,
    contents: fullPrompt,
    config: {
      systemInstruction: `You are a helpful farming assistant.
Reply in the same language the user writes in.

First, look at the CURRENT question and the CURRENT image (if any) by themselves.
If they are not about farming or agriculture, do not answer them. Reply only that you can help with farming, even if PREVIOUS_SUMMARY is about farming.
PREVIOUS_SUMMARY is only background for farming follow-up questions. Never use it to guess what an image contains.
If an image is attached, first identify what it actually shows before answering.

Each request contains a PREVIOUS_SUMMARY of the conversation so far (it may be empty).
1. Use PREVIOUS_SUMMARY as context when answering a farming question.
2. After answering, write an UPDATED summary: merge PREVIOUS_SUMMARY with what was discussed in this turn. Keep it short (max 5 sentences). If the current message was off-topic, keep the summary unchanged.

Return ONLY valid JSON in this format:
{"reply": "your answer as a plain text string", "summary": "the updated summary"}`,
      tools: [{ urlContext: {} }],
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  });

  
  return response.text;
};
export { getAiResponse };
