"use server";

import { Article } from "@/features/article";
import { Hanzi } from "@/features/hanzi";
import { InvertedIndex } from "@/features/invertedIndex";
import { Sentence } from "@/features/sentence";

import {
  addArticle,
  addHanzi,
  batchAddArticles,
  batchAddHanzis,
  batchAddInvertedIndexes,
  batchAddSentences,
  deleteArticle,
  removeSentence,
  updateArticle,
} from "@/firebase/admin";
import { REVALIDATE_TAGS } from "@/firebase/constants";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const batchAddArticlesAction = async (articles: Article[]) => {
  await batchAddArticles(articles);
  revalidatePath("/");
};

export const addArticleAction = async (article: Article) => {
  await addArticle(article);
  revalidateTag(REVALIDATE_TAGS.articles);
  redirect("/article/list");
};

export const updateArticleAction = async (
  id: string,
  title: string,
  createdAt: number,
) => {
  await updateArticle(id, title, createdAt);
  revalidateTag(REVALIDATE_TAGS.articles);
  revalidateTag(REVALIDATE_TAGS.article);
};

export const deleteArticleAction = async (id: string) => {
  await deleteArticle(id);
  revalidateTag(REVALIDATE_TAGS.articles);
};

export const addHanziAction = async (hanzi: Hanzi, articleId?: string) => {
  await addHanzi(hanzi);
  revalidateTag(REVALIDATE_TAGS.hanzis);
  if (articleId) {
    revalidatePath(`/article/${articleId}/form`);
  }
};

export const batchAddHanzisAction = async (hanzis: Hanzi[]) => {
  await batchAddHanzis(hanzis);
  revalidatePath("/");
};

export const batchAddInvertedIndexesAction = async (
  invertedIndexes: InvertedIndex[],
) => {
  await batchAddInvertedIndexes(invertedIndexes);
  revalidatePath("/");
};

export const removeSentenceAction = async (
  sentence: Sentence,
  hanzis: Hanzi[],
  articleId?: string,
) => {
  await removeSentence(sentence, hanzis, articleId);
  revalidateTag(REVALIDATE_TAGS.senences);
  revalidateTag(REVALIDATE_TAGS.articles);
};

export const batchAddSentencesAction = async (sentences: Sentence[]) => {
  await batchAddSentences(sentences);
  revalidatePath("/");
};
