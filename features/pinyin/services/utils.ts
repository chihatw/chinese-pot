import { Pinyin } from "../schema";

export const getPinyinStr = (pinyin: Pinyin) => {
  return pinyin.consonant + pinyin.vowel + pinyin.tone;
};
