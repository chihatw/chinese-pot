"use server";

import { Hanzi } from "@/features/hanzi";

import { REVALIDATE_TAGS } from "@/firebase/constants";
import { revalidateTag } from "next/cache";
import { batchAddSentences, removeSentence } from "../firebase";
import { Sentence } from "../schema";

export const removeSentenceAction = async (
  sentence: Sentence,
  hanzis: Hanzi[],
  articleId?: string,
) => {
  await removeSentence(sentence, hanzis, articleId);

  revalidateTag(REVALIDATE_TAGS.senences);
  revalidateTag(REVALIDATE_TAGS.article);
};

export const batchAddSentencesAction = async (sentences: Sentence[]) => {
  await batchAddSentences(sentences);
  revalidateTag(REVALIDATE_TAGS.senences);
  revalidateTag(REVALIDATE_TAGS.article);
};
