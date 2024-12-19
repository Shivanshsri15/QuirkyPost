import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogInfo: localStorage.getItem("blogInfo")?JSON.parse(localStorage.getItem("blogInfo")) : []
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
        
    }
})

export const { setBlogCredentials,clearBlogData } = blogSlice.actions

export default blogSlice.reducer;