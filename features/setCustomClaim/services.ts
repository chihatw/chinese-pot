import { authAdnimSDK } from "@/firebase/admin";

const UID = process.env.NEXT_PUBLIC_ADMIN_UID as string;

export const setAdmin = async () => {
  try {
    await authAdnimSDK.setCustomUserClaims(UID, { admin: true });
  } catch (e) {
    console.log(e);
  }
};
