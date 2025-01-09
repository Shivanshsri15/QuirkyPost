import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    commentName: {
        type: String,
        required:true
    },
    commentContent: {
        type: String,
        required: true
    },
    commentUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

}, {
    timestamps: true
})

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    blogCoverImage: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    blogLikes: [],
    blogComments: [commentSchema],
},{
    timestamps: true
})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog