import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './slices/authSlice'
import blogSliceReducer from './slices/blogSlice'
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        blog: blogSliceReducer
    },
    middleware: (GetDefaultMiddleware) =>
        GetDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})
export default store