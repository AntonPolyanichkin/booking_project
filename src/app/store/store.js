import { configureStore } from "@reduxjs/toolkit";
import { api } from "../baseApi/baseApi";
import { authApi } from "@/features/auth/api/authApi";
import authReducer from "@/features/auth/api/authSlice";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    authSlice: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware).concat(authApi.middleware),
});
