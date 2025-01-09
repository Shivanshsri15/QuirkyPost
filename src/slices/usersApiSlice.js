import { PFUPLOAD, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body:data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body:data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method:"POST"
            })
        }),
        getUser: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/getUser/${id}`,
                method: "GET",
            }),
            keepUnusedDataFor:5
        }),
        uploadUserPhoto: builder.mutation({
            query: (data) => ({
              url: `${PFUPLOAD}`,
              method: "POST",
              body: data,
            }),
          }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/updateProfile`,
                method: "PUT",
                body:data
            })
        }),
        followAndUnfollowUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/quirkyUser/${id}`,
                method: "POST",
            })
        }),
        getSavedUserBlog: builder.query({
            query: () => ({
                url: `${USERS_URL}/quirkyUser/savedBlogs`,
                method:"GET"
            }),
            keepUnusedDataFor:5
        }),
        // searchUserByText: builder.query({
        //     query: (searchText) => ({
        //         url: `${USERS_URL}/search?searchText=${searchText}`,
        //         method:"GET"
        //     })
        // })

        
    })
})

export const { useRegisterMutation, useLoginMutation,useLogoutMutation,useUpdateUserProfileMutation, useUploadUserPhotoMutation,useGetSavedUserBlogQuery, useGetUserQuery, useFollowAndUnfollowUserMutation } = usersApiSlice;