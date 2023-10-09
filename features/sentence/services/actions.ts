"use server";

import { Hanzi } from "@/features/hanzi";

import { REVALIDATE_TAGS } from "@/firebase/constants";
import { revalidateTag } from "next/cache";
import { batchAddSentences, removeSentence } from "../firebase";
import { Sentence } from "../schema";

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
