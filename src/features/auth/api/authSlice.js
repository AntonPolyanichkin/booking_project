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
      .addMatcher(isAnyOf(authApi.endpoints.login.matchPending, authApi.endpoints.googleAuth.matchPending, authApi.endpoints.signUp.matchPending), (state) => {
        state.loading = true;
        state.error = false;
      })
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchFulfilled,

          authApi.endpoints.refresh.matchFulfilled,
          authApi.endpoints.googleAuth.matchFulfilled,
          authApi.endpoints.signUp.matchFulfilled,
        ),
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
        },
      )
      .addMatcher(isAnyOf(authApi.endpoints.login.matchRejected, authApi.endpoints.refresh.matchRejected, authApi.endpoints.googleAuth.matchRejected, authApi.endpoints.signUp.matchRejected), (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Auth error";
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
