import Groq from 'groq-sdk'
import fs from 'fs'
const groq=new Groq({apiKey:process.env.GROQ_API_KEY})

const languageDetect=async(filepath,prompt="")=>{
    const transcript=await groq.audio.transcriptions.create({
        file: fs.createReadStream(filepath),
        model:'whisper-large-v3',
        response_format: 'verbose_json',
        
    })
    return transcript.text
}

export default languageDetect