import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogInfo: localStorage.getItem("blogInfo")?JSON.parse(localStorage.getItem("blogInfo")) : [], savedBlogs :localStorage.getItem("savedBlogs")?JSON.parse(localStorage.getItem("savedBlogs")) : []
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogCredentials: (state, action) => {
            state.blogInfo = action.payload;
            localStorage.setItem("blogInfo", JSON.stringify(action.payload))
        },
        clearBlogData: (state, action) => {
            state.blogInfo = [];
            localStorage.removeItem("blogInfo")
        },
        saveBlogsOnLocal: (state, action) => {
            state.savedBlogs = [...state.savedBlogs, action.payload];
            localStorage.setItem("savedBlogs", JSON.stringify(action.payload))

        },
        removeSavedBlogFromLocal: (state, action) => {
            // Ensure action.payload is defined
            if (action.payload === undefined) {
                console.error("Error: action.payload is undefined");
                return; // Exit the function if payload is not valid
            }
        
            // Check if savedBlogs is an array
            if (!Array.isArray(state.savedBlogs)) {
                console.error("Error: savedBlogs is not an array, resetting to empty array");
                state.savedBlogs = []; // Reset to an empty array
            }
        
            // Filter out the blog from savedBlogs
            state.savedBlogs = state.savedBlogs.filter((blog) => blog !== action.payload);
            
            // Update localStorage
            localStorage.setItem("savedBlogs", JSON.stringify(state.savedBlogs));
        }
    }
})

export const { setBlogCredentials,clearBlogData,saveBlogsOnLocal,removeSavedBlogFromLocal } = blogSlice.actions

export default blogSlice.reducer;