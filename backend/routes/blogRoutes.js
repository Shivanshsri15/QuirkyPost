import express from 'express'
import { addBlog, getBlogByUser } from '../controllers/blogController.js'
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.route("/addQuirky").post(protect,addBlog)
router.route("/addQuirky/:id").get(protect,getBlogByUser)

export default router;