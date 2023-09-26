import { Hanzi } from "@/features/hanzi";
import { buildPinyin } from "@/features/pinyin/services/buildPinyin";
import { SimpleSeed } from "..";

export const buildHanzi = (seed: SimpleSeed) => {
  const pinyin = buildPinyin(seed.yomi);
  if (!pinyin) return null;

  const hanzi: Omit<Hanzi, "id"> = {
    form: seed.midashi,
    pinyin,
  };

  return hanzi;
};
