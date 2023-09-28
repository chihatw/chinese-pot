import {
  EXTROVERTED_VOWELS,
  INTROVERTED_VOWELS,
  MAJOR_VOWELS,
  ONE_CHAR_CONSONANTS,
  TWO_CHAR_CONSONANTS,
  VOWEL_PAIRS,
} from "..";

export const pinyinColor = (pinyin: string) => {
  if (ONE_CHAR_CONSONANTS.includes(pinyin)) {
    return "bg-amber-100";
  }
  if (TWO_CHAR_CONSONANTS.includes(pinyin)) {
    return "bg-rose-100";
  }
  if (INTROVERTED_VOWELS.includes(pinyin)) {
    return "bg-purple-200";
  }
  if (EXTROVERTED_VOWELS.includes(pinyin)) {
    return "bg-pink-200";
  }
  if (MAJOR_VOWELS.includes(pinyin)) {
    return "bg-lime-100";
  }
  if (Object.keys(VOWEL_PAIRS).includes(pinyin)) {
    return "bg-emerald-100";
  }

  if (Object.values(VOWEL_PAIRS).includes(pinyin)) {
    return "bg-sky-100";
  }
  return "";
};
