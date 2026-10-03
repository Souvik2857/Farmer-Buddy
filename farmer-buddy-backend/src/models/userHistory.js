import mongoose from 'mongoose';


const userHistory = new mongoose.Schema({
    userEmail: {type: String, required: true, default: ''},
    conversation: {
        user: {type: String, default: ''},
        gemini: {type: String, default: ''}
    },
    summary: {type: String, default: ''},
    createdAt:{type:Date,default:Date.now}
});

export const userConvo = mongoose.model('userConvo', userHistory);