import express from 'express'
import { authUser, followAndunfollowUser, getUserById, getUserSavedBlogs, logOut, registerUser, updateProfile } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js' 
const router = express.Router()

router.route("/").post(registerUser);
router.route("/auth").post(authUser);
router.route("/getUser").post(protect,getUserById)
router.route("/updateProfile").put(protect,updateProfile)
router.post("/logout", logOut)
router.post("/quirkyUser/:id", protect, followAndunfollowUser)
router.get("/quirkyUser/savedBlogs", protect, getUserSavedBlogs)

export default router;