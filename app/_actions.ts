"use server";

import { Article } from "@/features/article";

import { Hanzi } from "@/features/hanzi";
import { InvertedIndex } from "@/features/invertedIndex";
import { Sentence } from "@/features/sentence";
import { updateCountAndLastestSentenceId_in_Hanzis } from "@/features/sentenceForm";

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
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const batchAddHanzisAction = async (hanzis: Hanzi[]) => {
  await batchAddHanzis(hanzis);
  // debug revalidatePath をつけなければ、 top page は更新されないのか？
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

export const addHanziAction = async (hanzi: Hanzi, articleId?: string) => {
  await addHanzi(hanzi);
  revalidateTag(REVALIDATE_TAGS.hanzis);
  // note sentence form でキャッシュが利用されているので、 revalidate が必要
  revalidateTag(REVALIDATE_TAGS.hanzisByForms);
  if (articleId) {
    revalidatePath(`/article/${articleId}/form`);
  }
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
  sentence: Sentence,
  selectedHanzis: Hanzi[],
  articleId?: string,
) => {
  const updatedHanzis = updateCountAndLastestSentenceId_in_Hanzis(
    selectedHanzis,
    sentence.id,
  );
  try {
    await addSentence(sentence, updatedHanzis, articleId);
    // note revalidatePath にすると、現在表示されていないページは更新されない
    revalidateTag(REVALIDATE_TAGS.senences);
    revalidateTag(REVALIDATE_TAGS.articles);
    revalidateTag(REVALIDATE_TAGS.invertedIndexByForm); // sentence search を更新
  } catch (e) {
    console.error(e);
  } finally {
    // 成功しても、失敗しても optimistic を上書きする
    if (articleId) {
      revalidatePath(`/article/${articleId}`);
    }
  }

  if (articleId) {
    redirect(`/article/${articleId}`);
  }
};

export const deleteSentenceAction = async (
  sentence: Sentence,
  articleId?: string,
) => {
  await deleteSentence(sentence, articleId);
  revalidateTag(REVALIDATE_TAGS.senences);
  revalidateTag(REVALIDATE_TAGS.articles);
  revalidateTag(REVALIDATE_TAGS.invertedIndexByForm); // sentence search を更新
};
