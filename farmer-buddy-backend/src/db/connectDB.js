import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB=async()=>{
    try {
        const connectDB=await mongoose.connect(`${process.env.MONGO_URI}`,{
            dbName:DB_NAME
        })
        console.log("Database connected successfully");       
    } catch (err) {
        console.log(`Error occured when connecting to the databast ${err}`);
        process.exit(1)
    }
}
export {connectDB}