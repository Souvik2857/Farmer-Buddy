import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { newUser,getUser, updateUser, soilDataHandler, getAiAnalyze, getHist, weatherHandler} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import { chatFullDetails, getAdmin, getUserByAdminLoct, login, logout, reviewChat, signup } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/adminAuth.js";


const router = Router();

router.route('/getUser').get(auth,getUser)
router.route('/updateUser').put(upload.single("avatar"),updateUser)
router.route('/analyze').post(auth,upload.single("files"),getAiAnalyze)
router.route('/getConversation').get(auth,getHist)
router.route('/getWeather').post(weatherHandler)
router.route('/getSoilData').post(soilDataHandler)


router.route('/adminLogin').post(login)
router.route('/adminSignup').post(signup)
router.route('/logout').get(verifyAdmin,logout)
router.route('/verifyAdmin').get(verifyAdmin,getAdmin)
router.route('/getUserDetails').get(verifyAdmin,getUserByAdminLoct)
router.route('/userFullDetails').post(chatFullDetails)
router.route('/reviewChat').post(reviewChat)
export default router;
