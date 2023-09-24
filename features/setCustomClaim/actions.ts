"use server";
import { setAdmin } from "./services";

export const setAdminAction = async () => {
  setAdmin();
};
