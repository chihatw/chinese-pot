"use server";

import { revalidatePath } from "next/cache";

import { InvertedIndex } from "@/features/invertedIndex";
import { batchAddInvertedIndexes } from "@/features/invertedIndex/services/firebase";

export const batchAddInvertedIndexesAction = async (
  invertedIndexes: InvertedIndex[],
) => {
  await batchAddInvertedIndexes(invertedIndexes);
  revalidatePath("/");
};