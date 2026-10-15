import { adminInfo } from "../models/adminInfo.js";
import { userConvo } from "../models/userHistory.js";
import { userinfo } from "../models/userInfo.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshToken=async(id)=>{
    try {
        const admin=await adminInfo.findById(id);
        
        const accessToken=await admin.generateAccessToken()
        const refreshToken=await admin.generateRefreshToken()
        admin.refreshToken=await refreshToken
        await admin.save()
        return {
            accessToken,refreshToken
        }
    } catch (err) {
        return false
    }
}

const getAdmin = async(req, res) => {
    try{
        const { email } = req.body;

        const adminData = await adminInfo.findOne({email}).select("-password -refreshToken");
        
        if(!adminData){
            return res.status(404).json({error: 'Admin not Found'});
        }
        return res.status(200).json({status:200, adminData});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}


const signup = async(req, res) => {
    try {
        const { email, password } = req.body;

        if( await adminInfo.findOne({ email })){
            return res.status(400).json({error: 'Email registered already'});
        }
        const hashedPassWord=await bcrypt.hash(password, 10)
        const administer = await adminInfo.create({email:email, password:hashedPassWord});
        return res.status(201).json({success: true});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        
        if(!email || !password){
            return res.status(404).json({status:404,message:"Enter email and Password Properly"})
        }
        const admin = await adminInfo.findOne({ email });
        
        
        if(!admin){
            return res.status(401).json({status:401,message: 'Invalid email or password'});
        }
        const comparePassword=await bcrypt.compare(password, admin.password)
        if(!comparePassword){
            return res.status(401).json({status:401,message:"Invalid email or password"})
        }
        const {accessToken,refreshToken}=await generateAccessAndRefreshToken(admin._id)
        const loggedInAdmin=await adminInfo.findById(admin._id).select(
            "-password -refreshToken"
        )
        const options={
            httpOnly:true,
            secure:true
        }
        return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json({status:200,data:loggedInAdmin})
        
    }catch(err){
        console.log(err);
        return res.status(500).json({error: err.message});
    }
};

const logout=async(req,res)=>{
    try {
        
        const admin=await adminInfo.findByIdAndUpdate(
            req.body._id,
            {
                $set:{
                    refreshToken:null
                },
            },
            {
                returnDocument:'after'
            }
        )
        const options={
            httpOnly:true,
            secure:true
        };
        return res.status(200).clearCookie("refreshToken",options).
        clearCookie("accessToken",options).json({status:200,message:"User logged Out"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({status:500,message:"User login failed"})
    }

}

const getUserByAdminLoct = async(req, res) => {
    try{
        const { email } = req.body;
        const admin = await adminInfo.findOne({ email });
        
        if(!admin){
            return res.status(404).json({error: 'Not Admin/ Admin not found'});
        }
        const users = await userinfo.find({'location.city': admin.location.city});
        res.status(200).json({city: admin.location.city, users});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

const reviewChat = async(req, res) => {
    try{
        const { adminEmail, feedback, approval } = req.user;
        const { userEmail,createdAt } = req.body;
        if(!(await userinfo.findOne({ email: userEmail }))){
            return res.status(404).json({ error: 'User not found' });
        }

        const chat = await userConvo.findOneAndUpdate(
            { chatId: userEmail, createdAt },
            { adminfeedback: feedback, approval },
            { new: true }
        );

        if(!chat){
            return res.status(404).json({error: 'Chat did not match any'});
        }
        res.status(200).json({success: true, chat})
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export { signup, login, getUserByAdminLoct, reviewChat ,getAdmin,logout};