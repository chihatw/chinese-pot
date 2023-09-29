"use server";

import { getSentenceByform } from "./firebase";

export const getSentenceByformAction = async (form: string) => {
  const result = await getSentenceByform(form);
  return result;
};
