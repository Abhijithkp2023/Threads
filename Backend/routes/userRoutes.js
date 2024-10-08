import experess from "express"
import {signupUser , loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile , getSuggestedUser,freezeAccount } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = experess.Router();

router.get("/profile/:query" , getUserProfile);
router.get("/suggested" , protectRoute, getSuggestedUser);
router.post("/signup" , signupUser);
router.post("/login" , loginUser);
router.post("/logout" , logoutUser);
router.post("/follow/:id" , protectRoute ,  followUnfollowUser);
router.put("/update/:id" , protectRoute ,  updateUser);
router.put("/freeze" , protectRoute ,  freezeAccount);

export default router;