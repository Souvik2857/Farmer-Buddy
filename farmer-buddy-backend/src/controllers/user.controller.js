import mongoose from "mongoose";
import { userinfo } from "../models/userInfo.js";
import { userConvo } from "../models/userHistory.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { processed } from "../middleware/sharp.js";
import { userInfo } from "os";
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

const updateUser = async(req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updateAllowed = ['Username', 'email', 'language', 'location'];
    const setFields = {};

    for(let key of updateAllowed){
      if(updates[key] == undefined){
        setFields[key] = updates[key];
      }
    }

    if(updates.location?.city){
      setFields['location.city'] = updates.location.city;
    }

    if(updates.location?.country){
      setFields['location.country'] = updates.location.country;
    }

    const updated = await userInfo.findByIdAndUpdate(
      id,
      {$set: setFields},
      {new: true, runValidators: true}
    );

    if(!updated){
      return res.status(404).json({error: 'Could Not Update Profile'});
    }

    await userConvo.create({
      userID: updated._id,
      conversation: {
        user: `Updated Fields: ${Object.keys(setFields).join('')}`,
        gemini: `Updated Records`
      }
    });
    res.json({success: true, user: updated});
  }catch(err){
    console.log('Updation Failed', err.message);
    res.status(500).json({success: false, error: err.message});
  }
};

export{newUser};
export{updateUser};
export{newUser,getUser,getHist}
