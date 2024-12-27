import express from 'express'
import { addBlog, commentOnBlog, getBlogById, getBlogByUser, getBlogComments, likeBlog, saveUserBlog } from '../controllers/blogController.js'
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.route("/addQuirky").post(protect,addBlog)
router.route("/addQuirky/:id").get(protect,getBlogByUser)
router.route("/QuirkyBlog/:id").get(protect,getBlogById)
router.route("/QuirkyBlog/reaction/:id").post(protect,likeBlog)
router.route("/QuirkyBlog/reaction/:id/comment").post(protect,commentOnBlog)
router.route("/QuirkyBlog/reaction/:id/getComments").get(protect,getBlogComments)
router.route("/QuirkyBlog/reaction/:id/saveBlog").post(protect,saveUserBlog)

export default router;