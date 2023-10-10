"use server";
// noto "use server" をつけないとエラー

import { Hanzi } from "@/features/hanzi";

import { buildSentenceFromHanzis, updateHanzis } from "@/features/sentenceForm";
import { addSentence } from "@/firebase/admin";
import { REVALIDATE_TAGS } from "@/firebase/constants";

import { nanoid } from "nanoid";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

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
    redirect(`/article/${articleId}`);
  }
};
