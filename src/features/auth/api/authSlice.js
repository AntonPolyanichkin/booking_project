import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(authApi.endpoints.login.matchPending, authApi.endpoints.refresh.matchPending), (state) => {
        state.loading = true;
        state.error = false;
      })
      .addMatcher(isAnyOf(authApi.endpoints.login.matchFulfilled), (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addMatcher(isAnyOf(authApi.endpoints.refresh.matchFulfilled), (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addMatcher(isAnyOf(authApi.endpoints.login.matchRejected), (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Auth error";
      })
      .addMatcher(isAnyOf(authApi.endpoints.refresh.matchRejected), (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Auth error";
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
