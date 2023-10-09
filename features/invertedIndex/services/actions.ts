"use server";

import { revalidateTag } from "next/cache";

import { InvertedIndex } from "@/features/invertedIndex";
import { batchAddInvertedIndexes } from "@/features/invertedIndex/firebase";
import { REVALIDATE_TAGS } from "@/firebase/constants";

export const batchAddInvertedIndexesAction = async (
  invertedIndexes: InvertedIndex[],
) => {
  await batchAddInvertedIndexes(invertedIndexes);
  revalidateTag(REVALIDATE_TAGS.invertedIndexes);
};
