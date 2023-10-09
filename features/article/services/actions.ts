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
  revalidateTag(REVALIDATE_TAGS.articles);
};

export const addArticleAction = async (article: Article) => {
  await addArticle(article);
  revalidatePath("/article/list");
};

export const updateArticleAction = async (
  id: string,
  title: string,
  createdAt: number,
) => {
  await updateArticle(id, title, createdAt);
  revalidatePath("article/list");
};

export const deleteArticleAction = async (id: string) => {
  await deleteArticle(id);
  revalidatePath("article/list");
};
