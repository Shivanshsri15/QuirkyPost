import { BLOGS_URL, COVERUPLOAD } from "../constants";
import { apiSlice } from "./apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addBlogs: builder.mutation({
            query: (data) => ({
                url: `${BLOGS_URL}/addQuirky`,
                method: "POST",
                body: data
            })
        }),
        addCoverPage: builder.mutation({
            query: (data) => ({
                url: `${COVERUPLOAD}`,
                method: "POST",
                body: data
            })
        }),
        getUserBlogs: builder.query({
            query: (id) => ({
                url: `${
                    BLOGS_URL
                    }/addQuirky/${id}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,

        })
    })
})

export const {useAddBlogsMutation, useAddCoverPageMutation, useGetUserBlogsQuery } = blogApiSlice