import asyncHandler from "../middlewares/asyncHandler.js";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

const addBlog = asyncHandler(async (req, res) => {
  const { title, blogCoverImage, content } = req.body;
  const blog = new Blog({
    title,
    blogCoverImage,
    content,
    author: req.user._id,
  });
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

const getBlogByUser = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ author: req.params.id }).populate(
    "author",
    "-password"
  );
  res.status(201).json(blogs);
});

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate(
    "author",
    "-password"
  );
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
});

const likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    const isLiked = blog.blogLikes.find((id) => id.equals(req.user._id));
    if (isLiked) {
      blog.blogLikes = blog.blogLikes.filter((id) => !id.equals(req.user._id));
      await blog.save();
      res.status(200).json("Blog unliked");
    } else {
      blog.blogLikes.push(req.user._id);
      await blog.save();
      res.status(200).json("Blog liked");
    }
  } else {
    res.status(404).json("Blog not found");
  }
});

const commentOnBlog = asyncHandler(async (req, res) => {
  const { commentName, commentContent } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    const userComment = {
      commentName,
      commentContent,
      commentUser: req.user._id,
    };
    blog.blogComments.push(userComment);
    await blog.save();
    res.status(200).json("Comment Posted Successfully");
  } else {
    res.status(404).json("Blog not found");
  }
});

const getBlogComments = asyncHandler(async (req, res) => {
  const populatedBlog = await Blog.findById(req.params.id).populate(
    "blogComments.commentUser",
    "-password"
  );
  if (populatedBlog) {
    res.status(200).json(populatedBlog);
  } else {
    res.status(404).json("Blog not found");
  }
});

const saveUserBlog = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const saved = user.savedBlogs.find((id) => id.equals(req.params.id))
    if (saved) {
      user.savedBlogs = user.savedBlogs.filter((id) => !id.equals(req.params.id))
      user.save()
      res.status(200).json("Blog unsaved")
    } else {
      
      user.savedBlogs.push(req.params.id);
      user.save()
      res.status(200).json("Blog Saved");
    }
  } else {
    res.status(404).json("user not found");
  }
});


export {
  addBlog,
  getBlogByUser,
  getBlogById,
  likeBlog,
  commentOnBlog,
  getBlogComments,
  saveUserBlog
};
