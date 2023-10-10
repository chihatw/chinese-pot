"use server";

import { Hanzi } from "@/features/hanzi";
import { batchAddHanzis } from "@/features/hanzi/firebase";
import { revalidatePath } from "next/cache";

export const batchAddHanzisAction = async (hanzis: Hanzi[]) => {
  await batchAddHanzis(hanzis);
  revalidatePath("/");
};
