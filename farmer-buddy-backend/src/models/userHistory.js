import mongoose from "mongoose";

const userHistory = new mongoose.Schema({
  userEmail: { type: String, required: true, default: "" },
  location:{type:String,required:true},
  conversation: {
    user: { type: String, default: "" },
    gemini: { type: String, default: "" },
  },
  picture: { type: String, default: "" },
  weather: {
    pressure: { type: Number, default: "" },
    dewPoint: { type: Number, default: "" },
    humidity: { type: Number, default: "" },
    windDirection: { type: Number, default: "" },
    windSpeed: { type: Number, default: "" },
    temperature: { type: Number, default: "" },
    location: { type: String, default: "" },
  },
  soil: {
    ph: { type: Number, default: "" },
    organicCarbon: { type: Number, default: "" },
    nitrogen: { type: Number, default: "" },
    clay: { type: Number, default: "" },
    silt: { type: Number, default: "" },
    sand: { type: Number, default: "" },
    cec: { type: Number, default: "" },
    bulkDensity: { type: Number, default: "" },
  },
  summary: { type: String, default: "" },
  confidence: { type: String, default: "" },
  isApproved: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const userConvo = mongoose.model("userConvo", userHistory);
