import mongoose from 'mongoose';

const userProfile = new mongoose.Schema({
    avatar: {type: String, deafult: ''},
    username: {type: String, required: true},
    email: {type: String, unique: true},
    language: {type: String, default: 'english'},
    location: {
        city: {type: String, default: ''},
        country: {type: String, default: ''}
    }
});

export const userinfo = mongoose.model('userinfo', userProfile);