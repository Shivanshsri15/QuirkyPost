import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './slices/authSlice'
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
    },
    middleware: (GetDefaultMiddleware) =>
        GetDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})
export default store