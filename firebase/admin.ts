import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  process.env.NEXT_FIREBASE_SERVICE_ACCOUNT_KEY as string,
);

!getApps()[0] &&
  initializeApp({
    credential: cert(serviceAccount),
  });

export const authAdnimSDK = getAuth();
export const dbAdmin = getFirestore();
