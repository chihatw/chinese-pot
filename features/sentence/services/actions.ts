"use server";

import { Hanzi } from "@/features/hanzi";

import { REVALIDATE_TAGS } from "@/firebase/constants";
import { revalidateTag } from "next/cache";
import { Sentence } from "../schema";
import { addSentence, batchAddSentences, removeSentence } from "./firebase";

export const addSentenceAction = async (
  sentence: Sentence,
  hanzis: Hanzi[],
) => {
  await addSentence(sentence, hanzis);
  revalidateTag(REVALIDATE_TAGS.senences); // note revalidatePath にすると、現在表示されていないページは更新されない
};

export const removeSentenceAction = async (
  sentence: Sentence,
  hanzis: Hanzi[],
) => {
  await removeSentence(sentence, hanzis);
  revalidateTag(REVALIDATE_TAGS.senences);
};

export const batchAddSentencesAction = async (sentences: Sentence[]) => {
  await batchAddSentences(sentences);
  revalidateTag(REVALIDATE_TAGS.senences);
};
