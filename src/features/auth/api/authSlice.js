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
      .addMatcher(isAnyOf(authApi.endpoints.login.matchPending, authApi.endpoints.refresh.matchPending, authApi.endpoints.signUp.matchPending, authApi.endpoints.logout.matchPending, authApi.endpoints.googleAuth.matchPending), (state) => {
        state.loading = true;
        state.error = false;
      })
      .addMatcher(isAnyOf(authApi.endpoints.login.matchFulfilled, authApi.endpoints.refresh.matchFulfilled, authApi.endpoints.signUp.matchFulfilled, authApi.endpoints.googleAuth.matchFulfilled), (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addMatcher(isAnyOf(authApi.endpoints.logout.matchFulfilled), (state, action) => {
        state.user = null;
        state.error = null;
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(authApi.endpoints.login.matchRejected, authApi.endpoints.refresh.matchRejected, authApi.endpoints.signUp.matchRejected, authApi.endpoints.logout.matchRejected, authApi.endpoints.googleAuth.matchRejected),
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message || "Auth error";
        },
      );
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
