//import jwt from "jsonwebtoken";
import { adminInfo } from "../models/adminInfo.js";
import { userinfo } from "../models/userInfo.js";
import bcrypt from 'bcrypt'


const getAdmin = async(req, res) => {
    try{
        const { email } = req.body;
        const admin = await adminInfo.findOne({ email });
        
        if(!admin){
            return res.status(404).json({error: 'Not Admin/ Admin not found'});
        } 
        return res.status(200).json({success: true, email});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const signup = async(req, res) => {
    try {
        const { email, password } = req.body;

        if( await adminInfo.findOne({ email })){
            return res.status(400).json({error: 'Email registered already'});
        }
        const hashedPassWord=await bcrypt.hash(password, 10)
        const administer = await adminInfo.create({email, hashedPassWord});
        return res.status(201).json({success: true, admin: {key: administer.key, email: administer.email}});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminInfo.findOne({ email });

        if(!admin){
            return res.status(404).json({error: 'Admin not found'});
        }

        if(admin.password !== password){
            return res.status(401).json({error: 'Incorrect Password'});
        }

        //const token = jwt.sign({id: admin._id, });
        res.status(200).json({success: true, token});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

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
        const { adminEmail, feedBack, approval } = req.user;
        const { userEmail, createdAt } = req.body;
        if(! (await adminInfo.findOne({ email: adminEmail }))){
            return res.status(404).json({ error: 'Admin not Found' });
        }

        if(!(await userinfo.findOne({ email: userEmail }))){
            return res.status(404).json({ error: 'User not Found' });
        }

        const chat = await userConvo.findOneAndUpdate(
            { chatId: userEmail, createdAt },
            { adminfeedBack: feedBack, approval },
            { new: true }
        );
        if(!chat){
            return res.status(404).json({ error: 'Chat did not matched any' });
        }

        res.status(200).json({success: true, chat});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export { signup, login, getUserByAdminLoct, reviewChat };