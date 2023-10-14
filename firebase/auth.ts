import { authAdmin } from "./admin";

export const setAdminRole = async (uid: string) => {
  try {
    // https://firebase.google.com/docs/auth/admin/custom-claims
    await authAdmin.setCustomUserClaims(uid, { admin: true });
  } catch (e) {
    console.log(e);
  }
};
