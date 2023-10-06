"use server";

import { revalidatePath } from "next/cache";
import { Article } from "..";
import { addArticle, deleteArticle, updateArticle } from "./firebase";

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
