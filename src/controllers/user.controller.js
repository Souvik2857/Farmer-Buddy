import mongoose from 'mongoose';
import { userinfo } from '../models/userInfo.js';
import { userConvo } from '../models/userHistory.js';


const getUser = async(req, res) => {
    const userInfo = new userinfo({
        Username: '01',
        email: '',
        language: '',

        location: {
            city: '',
            country: ''
        }

    });
await userInfo.save();
}


const getHist = async(req, res) => {
    const userHist = new userConvo({
        userID: '',
        conversation: {
            user: '',
            gemini: ''
        }
    });
await userHist.save();
}
