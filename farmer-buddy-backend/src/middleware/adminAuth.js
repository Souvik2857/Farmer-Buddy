import jwt from 'jsonwebtoken'
import { adminInfo } from '../models/adminInfo.js'

export const verifyAdmin=async(req,res,next)=>{
        try {
            const token=req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","")
            if(!token){
                return res.status(401).json({status:401,message:"Unauthorized user"})
            }
            const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
            const admin=await adminInfo.findById(decodeToken?._id).select("-password -refreshToken")
            if(!admin){
                return res.status(402).json({status:404,message:"AccessToken Invalid"})
            }

            req.admin=admin
            
            next()
        } catch (error) {
            console.log(error);
            
            return res.status(401).json({status:401,message:"invalid access Token"})
        }
}