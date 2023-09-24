import { authClient } from "@/firebase/client";
import { ERROR_CODES } from "@/firebase/constants";
import { FirebaseError } from "firebase/app";
import {
  UserCredential as FirebaseUserCredential,
  GoogleAuthProvider,
  createUserWithEmailAndPassword as createFirebaseUserWithEmailAndPassword,
  sendPasswordResetEmail as sendFirebasePasswordResetEmail,
  signInWithEmailAndPassword as signInFirebaseWithEmailAndPassword,
  signInWithPopup as signInFirebaseWithPopup,
  signOut as signOutFirebase,
} from "firebase/auth";
import {
  signIn as signInNextAuth,
  signOut as signOutNextAuth,
} from "next-auth/react"; // only on client side
import { SignInSchema } from "../schema";

const signInNextAuthWithToken = async (
  userCredential: FirebaseUserCredential,
) => {
  const idToken = await userCredential.user.getIdToken();
  signInNextAuth("credentials", { idToken });
};

export const signInAppWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<
  undefined | { error: { prop: keyof SignInSchema | "root"; message: string } }
> => {
  let userCredential: FirebaseUserCredential | undefined = undefined;
  try {
    userCredential = await signInFirebaseWithEmailAndPassword(
      authClient,
      email,
      password,
    );
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError))
      return { error: { prop: "root", message: "ログインできません" } };

    switch (error.code as keyof typeof ERROR_CODES) {
      case ERROR_CODES["auth/user-not-found"]:
        return {
          error: {
            prop: "email",
            message: "メールアドレスが未登録です",
          },
        };
      case ERROR_CODES["auth/wrong-password"]:
        return {
          error: { prop: "password", message: "パスワードが間違っています" },
        };
      case ERROR_CODES["auth/too-many-requests"]:
        return {
          error: {
            prop: "root",
            message: "too many requests. try again after some delay.",
          },
        };
    }
  }
  if (!userCredential)
    return {
      error: { prop: "root", message: "ログインできません" },
    };
  await signInNextAuthWithToken(userCredential);
};

export const signInAppWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInFirebaseWithPopup(authClient, provider);
  await signInNextAuthWithToken(userCredential);
};

export const signUpFirebaseWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<
  undefined | { error: { prop: keyof SignInSchema | "root"; message: string } }
> => {
  let userCredential: FirebaseUserCredential | undefined = undefined;
  try {
    userCredential = await createFirebaseUserWithEmailAndPassword(
      authClient,
      email,
      password,
    );
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError))
      return { error: { prop: "root", message: "很抱歉！發生了問題" } };

    switch (error.code as keyof typeof ERROR_CODES) {
      case ERROR_CODES["auth/email-already-in-use"]:
        return {
          error: { prop: "email", message: "這電郵地址已有人使用" },
        };
    }
  }
  if (!userCredential)
    return { error: { prop: "root", message: "很抱歉！發生了問題" } };
  await signInNextAuthWithToken(userCredential);
};

export const resetFirebasePassword = (email: string) => {
  sendFirebasePasswordResetEmail(authClient, email);
};

export const signOut = () => {
  signOutNextAuth();
  signOutFirebase(authClient);
};
