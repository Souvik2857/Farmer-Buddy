import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const adminProfile = new mongoose.Schema(
  {
    isAdmin: { type: Boolean, default: true },
    password: String,
    avatar: { type: String, default: "" },
    username: { type: String },
    email: { type: String, required: true },
    language: { type: String, default: "en" },

    location: {
      city: { type: String, default: null },
      country: { type: String, default: null },
      state:{type:String,default:null}
    },

    coordinates: {
      latitude: { type: String, default: null },
      longitude: { type: String, default: null },
    },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  },
);
adminProfile.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};
adminProfile.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};
export const adminInfo = mongoose.model("adminInfo", adminProfile);
