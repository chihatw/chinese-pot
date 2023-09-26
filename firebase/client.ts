import { getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string,
);

// Initialize Firebase
const app = getApps()?.length ? getApps()[0] : initializeApp(firebaseConfig);

export const authClient = getAuth(app);
const isDev = process.env.NODE_ENV === "development";
if (isDev) {
  connectAuthEmulator(authClient, "http://127.0.0.1:9099");
}
