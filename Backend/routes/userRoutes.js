import experess from "express"
import {signupUser , loginUser } from "../controllers/userController.js";

const router = experess.Router();

router.post("/signup" , signupUser);
router.post("/login" , loginUser);

export default router;