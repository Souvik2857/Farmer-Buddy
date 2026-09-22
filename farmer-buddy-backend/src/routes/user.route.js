import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { newUser,getUser } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.route('/getUser').get(auth,getUser)

export default router;
