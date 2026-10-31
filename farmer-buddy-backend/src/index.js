import 'dotenv/config'
import  app  from "./app.js";
import { connectDB } from "./db/connectDB.js";

const PORT=process.env.PORT || 5000

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`app is listening on Port ${PORT}`);
        
    })
}
).catch((err)=>{
    console.log("DataBase connection failed");
    
})

