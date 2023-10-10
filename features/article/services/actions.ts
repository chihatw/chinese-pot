"use server";

import { REVALIDATE_TAGS } from "@/firebase/constants";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  addArticle,
  batchAddArticles,
  deleteArticle,
  updateArticle,
} from "../firebase";
import { Article } from "../schema";

export const batchAddArticlesAction = async (articles: Article[]) => {
  await batchAddArticles(articles);
  revalidatePath("/");
};

export const addArticleAction = async (article: Article) => {
  await addArticle(article);
  revalidateTag(REVALIDATE_TAGS.articles);
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
  revalidatePath("article/list");
};
