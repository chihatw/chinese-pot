"use server";

import { Hanzi } from "@/features/hanzi";
import { batchAddHanzis } from "@/features/hanzi/services/firestore";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export const batchAddHanzisAction = async (hanzis: Omit<Hanzi, "id">[]) => {
  const _hanzis: Hanzi[] = hanzis.map((hanzi) => ({ ...hanzi, id: nanoid(8) }));
  await batchAddHanzis(_hanzis);
  revalidatePath("/");
};
