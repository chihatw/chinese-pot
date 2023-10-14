"use server";

import { Article } from "@/features/article";

import { Hanzi } from "@/features/hanzi";
import { InvertedIndex } from "@/features/invertedIndex";
import { Sentence } from "@/features/sentence";
import { buildSentenceFromHanzis, updateHanzis } from "@/features/sentenceForm";

import {
  addArticle,
  addHanzi,
  addSentence,
  batchAddArticles,
  batchAddHanzis,
  batchAddInvertedIndexes,
  batchAddSentences,
  deleteArticle,
  deleteSentence,
  updateArticle,
} from "@/firebase/admin";
import { REVALIDATE_TAGS } from "@/firebase/constants";
import { sleep } from "@/utils/utils";
import { nanoid } from "nanoid";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const batchAddHanzisAction = async (hanzis: Hanzi[]) => {
  await batchAddHanzis(hanzis);
  // note revalidatePath をつけなければ、 top page は更新されない
  revalidatePath("/");
};

export const batchAddArticlesAction = async (articles: Article[]) => {
  await batchAddArticles(articles);
  revalidatePath("/");
};

export const batchAddSentencesAction = async (sentences: Sentence[]) => {
  await batchAddSentences(sentences);
  revalidatePath("/");
};

export const batchAddInvertedIndexesAction = async (
  invertedIndexes: InvertedIndex[],
) => {
  await batchAddInvertedIndexes(invertedIndexes);
  revalidatePath("/");
};

export const addHanziAction = async (hanzi: Hanzi) => {
  await addHanzi(hanzi);
  revalidateTag(REVALIDATE_TAGS.hanzis);
  // note sentence form でキャッシュが利用されているので、 revalidate が必要
  revalidateTag(REVALIDATE_TAGS.hanzisByForms);
};

export const addArticleAction = async (article: Article) => {
  await addArticle(article);

  // note revalidateTagをつけると、 article list も、 top page も更新される
  // note revalidatePath の場合、 dev では、 top page も更新されるが、本番環境では更新されない
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
  redirect("/article/list");
};

export const deleteArticleAction = async (id: string) => {
  await deleteArticle(id);
  // note revalidatePath では、現在のページは更新されるが、top page が更新されない。
  // これは delete の操作が、fetch と違って　、 admin で行われるので tag が使われないから？
  // pnpm dev では 更新時に画面が崩れるが、本番環境では問題なし
  revalidateTag(REVALIDATE_TAGS.articles);
};

export const addSentenceAction = async (
  selectedHanziIds: string[],
  hanzis: Hanzi[],
  articleId?: string,
) => {
  const selectedHanzis = selectedHanziIds.map(
    (id) => hanzis.find((h) => h.id === id)!,
  );

  const sentenceId = nanoid();
  const sentence = buildSentenceFromHanzis(selectedHanzis, sentenceId);
  const updatedHanzis = updateHanzis(selectedHanzis, sentenceId);

  await addSentence(sentence, updatedHanzis, articleId);

  // note revalidatePath にすると、現在表示されていないページは更新されない
  revalidateTag(REVALIDATE_TAGS.senences);
  revalidateTag(REVALIDATE_TAGS.articles);

  if (articleId) {
    revalidatePath(`/article/${articleId}`);
    await sleep(200); // note revalidate の反映を待機
    redirect(`/article/${articleId}`);
  }
};

export const deleteSentenceAction = async (
  sentence: Sentence,
  hanzis: Hanzi[],
  articleId?: string,
) => {
  await deleteSentence(sentence, hanzis, articleId);
  revalidateTag(REVALIDATE_TAGS.senences);
  revalidateTag(REVALIDATE_TAGS.articles);
};
