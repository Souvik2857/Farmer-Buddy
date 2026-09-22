import 'dotenv/config'
import  app  from "./app.js";
import { connectDB } from "./db/connectDB.js";


connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`app is listening on Port ${process.env.PORT}`);
        
    })
}
).catch((err)=>{
    console.log("DataBase connection failed");
    
})

