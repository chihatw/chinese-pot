import {
  HALF_VOWELS,
  MAJOR_FULL_VOWELS,
  MINOR_FULL_VOWELS,
  ONE_CHAR_CONSONANTS,
  TWO_CHAR_CONSONANTS,
} from "..";

export const pinyinColor = (pinyin: string) => {
  if (ONE_CHAR_CONSONANTS.includes(pinyin)) {
    return "bg-amber-100";
  }
  if (TWO_CHAR_CONSONANTS.includes(pinyin)) {
    return "bg-rose-100";
  }
  if (MAJOR_FULL_VOWELS.includes(pinyin)) {
    return "bg-lime-100";
  }
  if (MINOR_FULL_VOWELS.includes(pinyin)) {
    return "bg-emerald-100";
  }
  if (HALF_VOWELS.includes(pinyin)) {
    return "bg-sky-100";
  }
  return "";
};
