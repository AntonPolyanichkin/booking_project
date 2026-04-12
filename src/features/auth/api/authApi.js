import DbOperations from "@/shared/service/DbOperations";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

function createPlainUserObj(user) {
  if (!user) {
    return null;
  } else {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: user.role || "user",
    };
  }
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const auth = getAuth();
          const result = await signInWithEmailAndPassword(auth, email, password);
          const userDb = new DbOperations("users");
          const userData = await userDb.getById(result.user.uid);
			 if(!userData){
				console.log("Юзера нема в базі");
				
			 }
          return { data: { ...createPlainUserObj(result.user), ...(userData ||{}) } };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
    googleAuth: builder.mutation({
      async queryFn() {
        try {
          const auth = getAuth();
          const provider = new GoogleAuthProvider();
          provider.setCustomParameters({ prompt: "select_account" });
          const result = await signInWithPopup(auth, provider);
          const userDb = new DbOperations("users");
          if (result.user && result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
            await userDb.setWithId(result.user.uid, createPlainUserObj(result.user));
          }
          const userData = await userDb.getById(result.user.uid);
          return { data: { ...createPlainUserObj(result.user), ...userData } };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
    signUp: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const auth = getAuth();
          const result = await createUserWithEmailAndPassword(auth, email, password);
          const userDb = new DbOperations("users");
          await userDb.setWithId(result.user.uid, createPlainUserObj(result.user));
          const userData = await userDb.getById(result.user.uid);
          return { data: { ...createPlainUserObj(result.user), ...userData } };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
    refresh: builder.mutation({
      async queryFn() {
        try {
          const auth = getAuth();
          const user = auth.currentUser;
          if (!user) return { error: { message: "Not authenticated" } };
          const usersDb = new DbOperations("users");
          const userData = await usersDb.getById(user.uid);
          return { data: { ...createPlainUserObj(user), ...userData } };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
    logout: builder.mutation({
      async queryFn() {
        try {
          const auth = getAuth();
          await signOut(auth);
          return { data: true };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useGoogleAuthMutation, useSignUpMutation, useRefreshMutation, useLogoutMutation } = authApi;
