import { Pinyin } from "..";

export const getPinyinStr = (pinyin: Pinyin) => {
  return pinyin.consonant + pinyin.vowel + pinyin.tone;
};
