import mongoose from "mongoose";

const userHistory = new mongoose.Schema({
  userEmail: { type: String, required: true, default: "" },
  conversation: {
    user: { type: String, default: "" },
    gemini: { type: String, default: "" },
  },
  picture: { type: String, default: "" },
  weather: {
    pressure: { type: String, default: "" },
    dewPoint: { type: String, default: "" },
    humidity: { type: String, default: "" },
    windDirection: { type: String, default: "" },
    windSpeed: { type: String, default: "" },
    temperature: { type: String, default: "" },
    location: { type: String, default: "" },
  },
  soil: {
    ph: { type: String, default: "" },
    organicCarbon: { type: String, default: "" },
    nitrogen: { type: String, default: "" },
    clay: { type: String, default: "" },
    silt: { type: String, default: "" },
    sand: { type: String, default: "" },
    cec: { type: String, default: "" },
    bulkDensity: { type: String, default: "" },
  },
  summary: { type: String, default: "" },
  confidence: { type: String, default: "" },
  isApproved: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const userConvo = mongoose.model("userConvo", userHistory);
