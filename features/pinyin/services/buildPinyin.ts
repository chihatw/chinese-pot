import {
  HALF_VOWELS,
  MAJOR_FULL_VOWELS,
  MINOR_FULL_VOWELS,
  ONE_CHAR_CONSONANTS,
  Pinyin,
  TONES,
  TWO_CHAR_CONSONANTS,
  VOWELS,
} from "..";
import { VowelType } from "../schema";

export const buildPinyin = (value: string): Pinyin | undefined => {
  const tail = value.at(-1) || "";
  let tone = "";
  if (TONES.includes(tail)) {
    tone = tail;
  }
  const valueOmitTone = !!tone ? value.slice(0, value.length - 1) : value;
  const consonant = getConsonant(valueOmitTone);
  const valueOmitToneConsonant = valueOmitTone.slice(consonant.length);

  const vowel = getVowel(valueOmitToneConsonant);

  let pinyin: Pinyin | undefined = undefined;

  pinyin = {
    tone,
    consonant,
    vowel,
  };

  return pinyin;
};

const getConsonant = (value: string) => {
  const headTwo = value.slice(0, 2);
  if (TWO_CHAR_CONSONANTS.includes(headTwo)) {
    return headTwo;
  }

  const headOne = value.at(0) || "";
  if (ONE_CHAR_CONSONANTS.includes(headOne)) {
    return headOne;
  }

  return "";
};

const getVowel = (value: string): string => {
  return VOWELS.includes(value) ? value : "";
};

export const isValidPinyin = ({
  consonant,
  vowel,
  // vowelType,
  tone,
}: Pinyin) => {
  // tone, 母音がないのは異常
  if (!tone || !vowel) return false;

  const vowelType = getVowelType(vowel);
  // 副母音で、子音がないのは異常
  if (vowelType === "minor" && !consonant) return false;

  // 半母音で、子音があるのは異常
  if (vowelType === "half" && !!consonant) return false;

  return true;
};

export const buildPinyins = (value: string) => {
  const pinyins: (Pinyin | undefined)[] = [];
  const units = value.split("\u0020").filter(Boolean);
  for (const unit of units) {
    const pinyin = buildPinyin(unit);
    pinyins.push(pinyin);
  }
  return pinyins;
};

export const getVowelType: (vowel: string) => VowelType | undefined = (
  vowel,
) => {
  if (MAJOR_FULL_VOWELS.includes(vowel)) return "major";
  if (MINOR_FULL_VOWELS.includes(vowel)) return "minor";
  if (HALF_VOWELS.includes(vowel)) return "half";
  return undefined;
};
