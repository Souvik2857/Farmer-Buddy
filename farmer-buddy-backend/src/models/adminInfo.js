import mongoose from 'mongoose';

const adminProfile = new mongoose.Schema({
    isAdmin: {type: Boolean,default:true} ,
    password: String,
    avatar: {type: String, default: ''},
    username: {type: String},
    email: {type: String, required: true},
    language: {type: String, default: 'en'},

    location: {
        city: {type: String, default: null},
        country: {type: String, default: null}
    },

    coordinates: {
        latitude: {type: String, default: null},
        longitude: {type: String, default: null}
    }
});

export const adminInfo = mongoose.model('adminInfo', adminProfile);