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

export const buildHanziId = (hanzi: Omit<Hanzi, "id">) => {
  let id = hanzi.form.charCodeAt(0).toString(16).padStart(5, "0");
  id += hanzi.pinyin.consonant || "_";
  id += hanzi.pinyin.vowel || "_";
  id += hanzi.pinyin.tone || "_";
  return id;
};
