"use server";

import { revalidatePath } from "next/cache";
import { Hanzi } from "..";
import { addHanzi } from "./firestore";

export const addHanziAction = async (value: Hanzi) => {
  await addHanzi(value);
  revalidatePath("/");
};
