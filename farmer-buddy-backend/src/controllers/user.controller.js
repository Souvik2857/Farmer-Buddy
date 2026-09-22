import mongoose from "mongoose";
import { userinfo } from "../models/userInfo.js";
import { userConvo } from "../models/userHistory.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { processedAvatar } from "../middleware/sharp.js";

const newUser = async (req, res) => {
  try {
    const picture=req.file?.path
    let picUrl
    if(picture){
      const proccessedPath=await processedAvatar(picture)
      picUrl=await uploadonCloudinary(proccessedPath)
    }
    else{
      picUrl=""
    }
    const userNew = new userinfo({
      username: req.body.username,
      email: req.body.email,
      language: req.body.language,
      avatar:picUrl,
      location: {
        city: req.body.city,
        country: req.body.country,
      },
    });
    await userNew.save();
    return res.json({ success: true,status:200, user: userNew });
  } catch (err) {
    console.error("An error occured", err.message);
    return res.status(500).json({ success: false,status:500, error: err.message });
  }
}


const getUser = async (req, res) => {
  try {
    const user=req.user
    console.log(user.email);
    
    const userData=await userinfo.findOne({email:"sarkarsouvik2343@gmail.com"})
    console.log(userData);
    if(!userData){
      return res.status(404).json({status:404,message:"User not found"})
    }
   return res.json({ status: 200, userData });
  } catch (err) {
    console.error(`Save Failed`, err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const getHist = async (req, res) => {
  try {
    const userHist = new userConvo({
      userID: req.body.userID,
      conversation: {
        user: req.body.userMessage,
        gemini: req.body.geminiMessage,
      },
    });
    await userHist.save();
    res.json({ success: true, history: saved });
  } catch (err) {
    console.error(`Loading Failed`, err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateUser = async(req, res) => {
  try{
    const { email } = req.body;
    const { userName, language, location } = req.body;

    // const setFields = {
    //   ...(userName !== undefined && { userName }),
    //   ...(language !== undefined && { language }),
    //   ...(location?.city !== undefined && { 'location.city': location.city }),
    //   ...(location?.country !== undefined && { 'location.country': location.country })
    // };
    
    const findUser = await userinfo.findOne({ email });

    if(!findUser){
      res.status(404).json({error: 'User Not Found'});
    }else{
      const updated = await userinfo.findOneAndReplace(
        { email },
        { $set: req.body },
        { new: true, runValidators: true }
      );
      return res.status(201).json({status:201,message:"user updated successfully"})
    }

    if(!updated) return res.status(404).json({error: 'User not found'});
  }catch(err){
    console.error('Updatation Failed', err.message);
    res.status(500).json({error: err.message});
  }
};


export{newUser,getUser,getHist,updateUser}
