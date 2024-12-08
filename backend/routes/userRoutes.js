import express from 'express'
import { authUser, logOut, registerUser, updateProfile } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js' 
const router = express.Router()

router.route("/").post(registerUser);
router.route("/auth").post(authUser);
router.route("/updateProfile").put(protect,updateProfile)
router.post("/logout", logOut)
export default router;