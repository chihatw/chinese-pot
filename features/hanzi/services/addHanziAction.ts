"use server";

import { revalidatePath } from "next/cache";
import { addHanzi } from "../firebase";
import { Hanzi } from "../schema";

export const addHanziAction = async (hanzi: Hanzi) => {
  await addHanzi(hanzi);
  revalidatePath("/sentence/form");
};
