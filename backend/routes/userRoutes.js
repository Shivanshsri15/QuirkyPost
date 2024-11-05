import express from 'express'
import { authUser, logOut, registerUser } from '../controllers/userController.js'

const router = express.Router()

router.route("/").post(registerUser);
router.route("/auth").post(authUser);
router.post("/logout", logOut)
export default router;