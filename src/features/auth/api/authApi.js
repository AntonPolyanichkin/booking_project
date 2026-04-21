import DbOperations from "@/shared/service/DbOperations";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { setUser } from "./authSlice";
import { getFirestore, getDoc, doc } from "firebase/firestore";

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
          if (!userData) {
            console.log("Юзера нема в базі");
          }
          return { data: { ...createPlainUserObj(result.user), ...(userData || {}) } };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
    refresh: builder.query({
      async queryFn() {
        try {
          const auth = getAuth();
          const user = await new Promise((resolve, reject) => {
            const unSub = onAuthStateChanged(
              auth,
              (user) => {
                unSub();
                resolve(user);
              },
              reject,
            );
          });
          if (!user) {
            return null;
          } else {
            const db = getFirestore();
            const docSnap = await getDoc(doc(db, "users", user.uid));
            const role = docSnap.data()?.role || "user";
            return {
              data: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                role,
              },
            };
          }
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

export const { useLoginMutation, useRefreshQuery, useLogoutMutation } = authApi;
