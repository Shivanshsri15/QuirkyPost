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
        })
    })
})

export const { useRegisterMutation, useLoginMutation,useLogoutMutation,useUpdateUserProfileMutation, useUploadUserPhotoMutation } = usersApiSlice;