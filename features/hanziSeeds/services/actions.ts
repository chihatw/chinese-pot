"use server";

import { Hanzi } from "@/features/hanzi/schema";
import { batchAddHanzis } from "@/features/hanzi/services/firebase";
import { revalidatePath } from "next/cache";

export const batchAddHanzisAction = async (hanzis: Hanzi[]) => {
  await batchAddHanzis(hanzis);
  revalidatePath("/");
};
