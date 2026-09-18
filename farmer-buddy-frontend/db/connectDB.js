import mongoose from "mongoose";
const connectDB=async()=>{
    try {
        const db=await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDb connected successfully");
    } catch (err) {
        console.log("samoething went wrong while connecting to the database");
        process.exit(1);
    }
}
export {connectDB}