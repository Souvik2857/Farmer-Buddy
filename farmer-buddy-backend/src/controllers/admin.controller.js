//import jwt from "jsonwebtoken";
import { adminInfo } from "../models/adminInfo.js";

const signup = async(req, res) => {
    try {
        const { admin, username, email, language } = req.body;

        if( await adminInfo.findOne({ email })){
            return res.status(400).json({error: 'Email registered already'});
        }
        
        const administer = await adminInfo.create({admin, key, username, email, password});
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

export { signup, login };