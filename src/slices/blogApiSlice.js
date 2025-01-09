import { BLOGS_URL, COVERUPLOAD } from "../constants";
import { apiSlice } from "./apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBlogs: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/addQuirky`,
        method: "POST",
        body: data,
      }),
    }),
    addCoverPage: builder.mutation({
      query: (data) => ({
        url: `${COVERUPLOAD}`,
        method: "POST",
        body: data,
      }),
    }),
    getUserBlogs: builder.query({
      query: (id) => ({
        url: `${BLOGS_URL}/addQuirky/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getBlogByBlogId: builder.query({
      query: (id) => ({
        url: `${BLOGS_URL}/QuirkyBlog/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    likeBlog: builder.mutation({
      query: (id) => ({
        url: `${BLOGS_URL}/QuirkyBlog/reaction/${id}`,
        method: "POST",
      }),
    }),
    commentBlog: builder.mutation({
      query: ({ data, id }) => ({
        url: `${BLOGS_URL}/QuirkyBlog/reaction/${id}/comment`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: "Blogs",
    }),
    getBlogCommentsApi: builder.mutation({
      query: (id) => ({
        url: `${BLOGS_URL}/QuirkyBlog/reaction/${id}/getComments`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: "Blogs",
    }),
    saveUserBlogs: builder.mutation({
      query: (id) => ({
        url: `${BLOGS_URL}/QuirkyBlog/reaction/${id}/saveBlog`,
        method: "POST",
      }),
      keepUnusedDataFor: 5,
    }),
    getTrendingBlogs: builder.query({
      query: () => ({
        url: `${BLOGS_URL}/QuirkyTrending`,
        method:"GET"
      }),
      keepUnusedDataFor: 5,
    }),
    loadMoreBlogsApi: builder.mutation({
      query: ({ page }) => ({
        url: `${BLOGS_URL}/loadmoreBlogs`,
        params: { page },
        method:"POST"
      })
    })
  }),
});

export const {
  useAddBlogsMutation,
  useAddCoverPageMutation,
  useGetUserBlogsQuery,
  useGetBlogByBlogIdQuery,
  useLikeBlogMutation,
  useCommentBlogMutation,
  useGetBlogCommentsApiMutation,
  useSaveUserBlogsMutation,
  useGetTrendingBlogsQuery,
  useLoadMoreBlogsApiMutation
} = blogApiSlice;
