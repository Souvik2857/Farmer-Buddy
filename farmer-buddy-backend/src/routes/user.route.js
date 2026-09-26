import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { newUser,getUser, updateUser } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.route('/getUser').get(auth,getUser)
router.route('/updateUser').put(auth,upload.single("avatar"),updateUser)

export default router;
