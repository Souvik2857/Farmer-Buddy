import mongoose from "mongoose";
import { userinfo } from "../models/userInfo.js";
import { userConvo } from "../models/userHistory.js";
import { deleteImageOnCloudinary, uploadonCloudinary } from "../utils/cloudinary.js";
import { processedAvatar } from "../middleware/sharp.js";
import { getWeather, getSoilData } from "../utils/getWeather.js";
import languageDetect from "../utils/languageDetection.js";

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
    const userData=await userinfo.findOne({email:user.email})   
    if(!userData){
      return res.status(404).json({status:404,message:"User not found"})
    }
   return res.json({ status: 200,userData});
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
    const { email } = req.user;
    const avatar=req.file?.path
    let avatarURL;
    if(avatar){
      avatarURL=await uploadonCloudinary(avatar)
    }
    const findUser = await userinfo.findOne({ email });
    
    if(!findUser){
      res.status(404).json({error: 'User Not Found'});
    }
    
    const preUrl=findUser.avatar
    if(preUrl!=""){
      await deleteImageOnCloudinary(preUrl)
    }
      const updated = await userinfo.findOneAndReplace(
        { email },
        {
          avatar:avatarURL,
          username: req.body?.username,
          email: email,
          language: req.body?.language,
          location: {
            city: req.body?.location || "",
            country: req.body?.country || '',
            state:req.body?.state
          },

    cordinates: {
        latitude: req.body?.latitude || "",
        longitude: req.body?.longitude || ""
    }
        },
        { returnDocument:"after", runValidators: true }
      );
      return res.status(201).json({status:201,message:"user updated successfully"})
    

    if(!updated) return res.status(404).json({error: 'User not found'});
  }catch(err){
    console.error('Updatation Failed', err.message);
    res.status(500).json({error: err.message});
  }
};

const weatherHandler = async(req, res) => {
  try {
    const {lat, lon} = req.body;
    const data = await getWeather(lat, lon);
    if(!lat || !lon){
      res.status(404).json({error: 'latitude, longitude required'});
    }
    return res.status(200).json({...data });
  }catch(err){
    return res.status(500).json({error: err.message});
  }
};

const soilDataHandler = async(req, res) => {
  try {
    const { lat, lon} = req.body;
    
    const soil = await getSoilData(lat, lon)

  
    return res.status(200).json({status:200,data:soil});
  }catch(err){
    console.log('Soil Data Fetching failed', err.message);
    return res.status(500).json({error: err.message});
  }
};
const getAiAnalyze=async(req,res)=>{
      const fileUrl=req.file?.path
      const fileUpload=await uploadonCloudinary(fileUrl)
      
}




export{newUser,getUser,getHist,updateUser,soilDataHandler,getAiAnalyze}
