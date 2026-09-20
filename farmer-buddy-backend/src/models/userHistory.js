import mongoose from 'mongoose';

const userHistory = new mongoose.Schema({
    userID: {type: String, require: true, unique: true, default: ''},
    conversation: {
        user: {type: String, default: ''},
        gemini: {type: String, default: ''}
    }
});

export const userConvo = mongoose.model('userConvo', userHistory);