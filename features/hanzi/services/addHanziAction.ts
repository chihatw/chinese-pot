"use server";

import { REVALIDATE_TAGS } from "@/firebase/constants";
import { revalidatePath, revalidateTag } from "next/cache";
import { addHanzi } from "../firebase";
import { Hanzi } from "../schema";

export const addHanziAction = async (hanzi: Hanzi, articleId?: string) => {
  await addHanzi(hanzi);
  revalidateTag(REVALIDATE_TAGS.hanzis);
  if (articleId) {
    revalidatePath(`/article/${articleId}/form`);
  }
};
