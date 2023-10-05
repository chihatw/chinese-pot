"use server";

import { Hanzi } from "@/features/hanzi";
import { revalidatePath } from "next/cache";
import { Sentence } from "..";
import { addSentence, removeSentence } from "./firebase";

export const addSentenceAction = async (
  sentence: Sentence,
  hanzis: Hanzi[],
) => {
  await addSentence(sentence, hanzis);
  revalidatePath("/sentence/form");
};

export const removeSentenceAction = async (
  sentence: Sentence,
  hanzis: Hanzi[],
) => {
  await removeSentence(sentence, hanzis);
  revalidatePath("/sentence/list");
};
