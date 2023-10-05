import { Hanzi_old } from "@/features/hanzi";
import { buildPinyin } from "@/features/pinyin/services/buildPinyin";
import { getPinyinStr } from "@/features/pinyin/services/utils";
import { SimpleSeed } from "..";

export const buildHanzi = (seed: SimpleSeed) => {
  const pinyin = buildPinyin(seed.yomi);

  if (!getPinyinStr(pinyin)) return null;

  const hanzi: Omit<Hanzi_old, "id"> = {
    form: seed.midashi,
    pinyin,
  };

  return hanzi;
};
