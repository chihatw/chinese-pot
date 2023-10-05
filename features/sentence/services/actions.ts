"use server";

import { Hanzi } from "@/features/hanzi";
import { revalidatePath } from "next/cache";
import { Sentence } from "..";
import { addSentence } from "./firebase";

export const addSentenceAction = async (
  sentence: Sentence,
  hanzis: Hanzi[],
) => {
  await addSentence(sentence, hanzis);
  revalidatePath("/sentenceForm");
};
