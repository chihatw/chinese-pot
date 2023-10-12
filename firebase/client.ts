import { getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string,
);

// Initialize Firebase
const app = getApps()?.length ? getApps()[0] : initializeApp(firebaseConfig);

export const authClient = getAuth(app);
// note 現在未使用
// export const dbClient = getFirestore(app);

// note local build
const isDev = process.env.NODE_ENV === "development";
if (isDev) {
  connectAuthEmulator(authClient, "http://127.0.0.1:9099");
  // https://firebase.google.com/docs/emulator-suite/connect_firestore?hl=ja#web-modular-api
  // connectFirestoreEmulator(dbClient, "127.0.0.1", 8080);
}
