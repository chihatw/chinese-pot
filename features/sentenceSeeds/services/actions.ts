"use server";

import { Article } from "@/features/article";
import { batchAddArticles } from "@/features/article/services/firebase";
import { Sentence, SentenceUnigram } from "@/features/sentence";
import { batchAddSentences } from "@/features/sentence/services/firebase";
import { revalidatePath } from "next/cache";

export const batchAddArticlesAction = async (articles: Article[]) => {
  await batchAddArticles(articles);
  revalidatePath("/");
};

export const batchAddSentencesAction = async (sentences: Sentence[]) => {
  await batchAddSentences(sentences);
  revalidatePath("/");
};

export const batchAddSentenceUnigramsAction = async (
  unigrams: SentenceUnigram[],
) => {
  // todo
  revalidatePath("/");
};
