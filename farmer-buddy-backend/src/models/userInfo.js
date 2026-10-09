import mongoose from 'mongoose';

const userProfile = new mongoose.Schema({
    avatar: {type: String, default: ''},
    username: {type: String, required: true},
    email: {type: String, unique: true},
    language: {type: String, default: null},
    location: {
        city: {type: String, default: null},
        country: {type: String, default: null},
        state:{type:String,default:null}
    },
    cordinates: {
        latitude: String,
        longitude: String
    },
    isAdmin:{type:Boolean,default:false}
});

export const userinfo = mongoose.model('userinfo', userProfile);