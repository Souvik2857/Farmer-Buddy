import {GoogleGenAI} from '@google/genai'


const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API}) 
const Model='gemini-3.1-flash-lite'
const getAiResponse=async(previousPromt,prompt,imageUrl="")=>{
  const fullPrompt=imageUrl ? `previous conversation is ${previousPromt} new prompt is ${prompt}\n\nImage URL: ${imageUrl}` : `previous conversation is ${previousPromt} new prompt is ${prompt}`;
   const response = await ai.models.generateContent({
      model: Model,
      contents: fullPrompt,
      config: {
        systemInstruction: "You are a helpful farming assistant. Only answer farming or agriculture-related questions. If the question and the picture is not about farming, politely say you can only help with farming. Reply in the same language the user writes in. also at the end give me a short summary of this conversation and add this summary to the previous summary if it has in a separate json format",
        tools:[{urlContext:{}}],
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });
    
    return response.text
}
export {getAiResponse}