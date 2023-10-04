"use server";

import { Hanzi_old } from "@/features/hanzi";
import { batchAddHanzis } from "@/features/hanzi/services/firebase";
import { revalidatePath } from "next/cache";
import { buildHanziId } from "./utils";

export const batchAddHanzisAction = async (hanzis: Omit<Hanzi_old, "id">[]) => {
  // 拼音と字形でidが一意に決まるので、firestore側で重複回避ができる
  const _hanzis: Hanzi_old[] = hanzis.map((hanzi) => {
    return {
      ...hanzi,
      id: buildHanziId(hanzi),
    };
  });
  await batchAddHanzis(_hanzis);
  revalidatePath("/");
};
