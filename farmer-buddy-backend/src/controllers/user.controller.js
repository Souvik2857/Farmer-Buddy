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
    const userInfo = new userinfo({
      Username: req.body.Username,
      email: req.body.email,
      language: req.body.language,

      location: {
        city: req.body.city,
        country: req.body.country,
      },
    });
    await userInfo.save();
    return res.json({ status: 200, user });
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

export{newUser,getUser,getHist}