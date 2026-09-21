import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { newUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/picture").post(upload.single("pic"), newUser);
export default router;
