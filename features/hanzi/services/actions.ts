"use server";

import { revalidatePath } from "next/cache";

import { Hanzi_old } from "..";
import { addHanzi } from "./firebase";

export const addHanziAction = async (value: Hanzi_old) => {
  await addHanzi(value);
  revalidatePath("/");
};
