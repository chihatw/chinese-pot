"use server";

import { Hanzi } from "@/features/hanzi";
import { batchAddHanzis } from "@/features/hanzi/firebase";
import { REVALIDATE_TAGS } from "@/firebase/constants";
import { revalidateTag } from "next/cache";

export const batchAddHanzisAction = async (hanzis: Hanzi[]) => {
  await batchAddHanzis(hanzis);
  revalidateTag(REVALIDATE_TAGS.hanzis);
};
