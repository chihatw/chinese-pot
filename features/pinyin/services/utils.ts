import { Pinyin } from "..";

export const isDisable = (hanzi: string, pinyins: (Pinyin | undefined)[]) => {
  if (!hanzi) true;

  const hanziOmitAlphabet = hanzi.replace(/[a-z]/gi, "");

  return hanziOmitAlphabet.length !== pinyins.length;
};
