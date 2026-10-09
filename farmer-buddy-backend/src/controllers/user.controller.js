import mongoose from "mongoose";
import { userinfo } from "../models/userInfo.js";
import { userConvo } from "../models/userHistory.js";
import {
  deleteImageOnCloudinary,
  uploadonCloudinary,
} from "../utils/cloudinary.js";
import { processedAvatar } from "../middleware/sharp.js";
import { getWeather, getSoilData } from "../utils/getWeather.js";
import languageDetect from "../utils/languageDetection.js";
import { getAiResponse } from "../utils/aiAnalyze.js";


const newUser = async (req, res) => {
  try {
    const picture = req.file?.path;
    let picUrl;
    if (picture) {
      const proccessedPath = await processedAvatar(picture);
      picUrl = await uploadonCloudinary(proccessedPath);
    } else {
      picUrl = "";
    }
    const userNew = new userinfo({
      username: req.body.username,
      email: req.body.email,
      language: req.body.language,
      avatar: picUrl,
      location: {
        city: req.body.city,
        country: req.body.country,
      },
    });
    await userNew.save();
    return res.json({ success: true, status: 200, user: userNew });
  } catch (err) {
    console.error("An error occured", err.message);
    return res
      .status(500)
      .json({ success: false, status: 500, error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.user;
    const userData = await userinfo.findOne({ email: user.email });
    if (!userData) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    return res.json({ status: 200, userData });
  } catch (err) {
    console.error(`Save Failed`, err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const getHist = async (req, res) => {
  try{
    const {email}=req.user
    const userHist=await userConvo.find({userEmail:email}).select(
      "-_id -userEmail -confidence"
    )
    return res.status(200).json({status:200,data:userHist})
  } catch (err) {
    console.error(`Loading Failed`, err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email } = req.body;
    const avatar = req.file?.path;
    let avatarURL;
    if (avatar) {
      avatarURL = await uploadonCloudinary(avatar);
    }
    const findUser = await userinfo.findOne({ email });

    if (!findUser) {
      res.status(404).json({ error: "User Not Found" });
    }

    const preUrl = findUser.avatar;
    if (preUrl != "") {
      await deleteImageOnCloudinary(preUrl);
    }
    const updated = await userinfo.findOneAndReplace(
      { email },
      {
        avatar: avatarURL,
        username: req.body?.username,
        email: email,
        language: req.body?.language,
        location: {
          city: req.body?.location || "",
          country: req.body?.country || "",
          state: req.body?.state,
        },
        isAdmin:req.body.isAdmin,
        cordinates: {
          latitude: req.body?.latitude || "",
          longitude: req.body?.longitude || "",
        },
      },
      { returnDocument: "after", runValidators: true },
    );
    return res
      .status(201)
      .json({ status: 201, message: "user updated successfully" });

    
  } catch (err) {
    console.error("Updatation Failed", err.message);
    res.status(500).json({ error: err.message });
  }
};

const weatherHandler = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const data = await getWeather(latitude, longitude);
    if (!latitude || !longitude) {
      res.status(404).json({ error: "latitude, longitude required" });
    }
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const soilDataHandler = async (req, res) => {
  try {
    
    const { latitude, longitude } = req.body;

    const soil = await getSoilData(latitude, longitude);

    return res.status(200).json({ status: 200, data: soil });
  } catch (err) {
    console.log("Soil Data Fetching failed", err.message);
    return res.status(500).json({ error: err.message });
  }
};
const getAiAnalyze = async (req, res) => {
try {
    if (req.body.text==="{}") {
      return res.status(404).json({status:404,message:"Enter message"})
    }
    const {weatherData}=req.body
    const {soilData}=req.body
    const fileUrl = req.file?.path;
    const data = req.body; 
    const userData = req.user;
    const prompt = JSON.parse(data.text).text;
    let soil
    if(soilData != 'undefined'){
      soil=JSON.parse(soilData)
    }
    else{
      soil=""
    }
    let weather
    if(weatherData!= 'undefined'){
      weather=JSON.parse(weatherData)
    }
    else{
      weather=""
    }
    
    let fileUpload=''
    if(fileUrl)  {
      fileUpload = await uploadonCloudinary(fileUrl);
    }
    const preHist=await userConvo.findOne({userEmail:userData.email}).sort({createdAt:-1})
    const resData = await getAiResponse(preHist?.summary,prompt, fileUpload,weatherData,soilData);
    const parsedResData=JSON.parse(resData)
    const geminiReply=parsedResData.reply
    const summary=parsedResData.reply
    const confidence=parsedResData.confidence
    let approved=false
    if (confidence==='green') {
      approved="True"
    }
    else if(confidence==='yellow'){
        approved="Moderate"
    }
    else if(confidence==='red'){
        approved="Low"
    }
    else{
      approved=null
    }
    
    //if the approved is below true then it will go to admin panel automatically we will add those feature later
    if(approved){
      const userHistory = await userConvo.create({
        userEmail: userData.email,
        conversation: {
          user: prompt,
          gemini: geminiReply,
        },
        picture:fileUpload.replace("http","https") || '',
         weather: {
          pressure: weather.pressure,
          dewPoint: weather.dewPoint,
          humidity: weather.humidity,
          windDirection: weather.windDirection,
          windSpeed: weather.windSpeed,
          temperature: weather.temperature,
          location: weather.location,
        },
        soil: {
          ph: soil.ph,
          organicCarbon: soil.organicCarbon,
          nitrogen: soil.nitrogen,
          clay: soil.clay,
          silt: soil.silt,
          sand: soil.sand,
          cec:soil.cec,
          bulkDensity: soil.bulkDensity,
        },
        summary: summary,
        confidence:confidence,
        isApproved:approved
      });
      return res.status(200).json({...userHistory._doc});
    }
    const userConvoData={
      conversation:{
        user:prompt,
        gemini:geminiReply
      },
      picture:fileUpload.replace("http","https") || '',
      isApproved:approved
    }
    return res.status(200).json({...userConvoData});
      
} catch (error) {
  return res.status(500).json({status:500,message:`internal server error ${error}`})
}
};

export { newUser, getUser, getHist, updateUser, soilDataHandler, getAiAnalyze ,weatherHandler};
