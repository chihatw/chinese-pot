"use server";

import { revalidatePath } from "next/cache";
import { Hanzi } from "..";
import { addHanzi } from "./firebase";

export const addHanziAction = async (hanzi: Hanzi) => {
  await addHanzi(hanzi);
  revalidatePath("/sentence/form");
};
