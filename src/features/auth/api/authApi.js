import { role } from "@/app/routes/role/role";
import DbOperations from "@/shared/service/DbOperations";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";

export function createPlainUserObj(user) {
  if (!user) {
    return null;
  } else {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: user.role || role.user,
    };
  }
}
export const userDb = new DbOperations("users");
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const auth = getAuth();
          const result = await signInWithEmailAndPassword(auth, email, password);
          const userData = await userDb.getById(result.user.uid);
          return { data: { ...createPlainUserObj(result.user), role: userData?.role || role.user } };
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
            return { data: null };
          } else {
            const db = getFirestore();
            const docSnap = await getDoc(doc(db, "users", user.uid));
            const userRole = docSnap.data()?.role || role.user;
            return { data: { ...createPlainUserObj({ ...user, role: userRole }) } };
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
    signUp: builder.mutation({
      async queryFn({ email, password }) {
        console.log(email, password);

        const auth = getAuth();
        try {
          const newUser = await createUserWithEmailAndPassword(auth, email, password);
          const setUser = await userDb.setWithId(newUser.user.uid, { email: newUser.user.email, role: role.user });
          //  await userDb.add("users", { ...newUser.user });
          return {
            data: {
              ...createPlainUserObj({
                email: newUser.user.email,
                role: role.user,
              }),
            },
          };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
    googleAuth: builder.mutation({
      async queryFn() {
        try {
          // Виконати автентифікацію на Firebase
          const auth = getAuth();
          const provider = new GoogleAuthProvider();
          provider.setCustomParameters({ prompt: "select_account" });
          const result = await signInWithPopup(auth, provider);
          const usersDb = new DbOperations("users");
          // Якщо користувач новий, додати у Firestore
          if (result.user && result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
            await usersDb.setWithId(result.user.uid, {
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL || "",
              role: "user",
              createdAt: new Date().toISOString(),
            });
          }
          // Завжди отримуємо дані з Firestore
          const userData = await usersDb.getById(result.user.uid);
          // Об'єднати Firebase user + Firestore user
          return { data: { ...createPlainUserObj(result.user), ...userData } };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshQuery, useLogoutMutation, useSignUpMutation, useGoogleAuthMutation } = authApi;
