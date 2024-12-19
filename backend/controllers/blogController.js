import asyncHandler from "../middlewares/asyncHandler.js";
import Blog from "../models/blogModel.js"; 

const addBlog = asyncHandler(async (req, res) => {
    const { title, blogCoverImage, content } = req.body;
    const blog = new Blog({
        title,
        blogCoverImage,
        content,
        author: req.user._id
    })
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
})

const getBlogByUser = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({ author: req.params.id }).populate("author", "-password");
    res.status(201).json(blogs);
})

export {addBlog, getBlogByUser}