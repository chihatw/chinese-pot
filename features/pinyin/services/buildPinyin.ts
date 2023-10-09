import { Pinyin, PinyinFilter } from "@/features/pinyin";
import {
  CONSONANT_FILTER,
  ONE_CHAR_CONSONANTS,
  TWO_CHAR_CONSONANTS,
} from "../constants/consonants";
import { TONES } from "../constants/tones";
import { VOWEL_FILTER } from "../constants/vowelfilter";
import {
  EXTROVERTED_VOWELS,
  INTROVERTED_VOWELS,
  VOWELS,
  VOWEL_PAIRS,
} from "../constants/vowels";

export const buildPinyin = (value: string): Pinyin => {
  // 最後尾が TONE かどうかチェック
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

export const buildPinyinFilter = (value: string): PinyinFilter => {
  const tone = getTone(value);

  // value から tone を削除
  const valueOmittedTone = !!tone ? value.slice(0, value.length - 1) : value;
  let consonants = getConsonants(valueOmittedTone);

  if (!!tone && consonants.length === 2) {
    consonants = consonants.filter((con) => con.length === 1);
  }

  let vowels = getVowelsByConsonants(valueOmittedTone, consonants);

  if (!!tone && vowels.length > 1) {
    const shortest = getShortestVowel(vowels);
    vowels = [shortest];
  }

  if (!!vowels.length && consonants.length === 2) {
    consonants = consonants.filter((con) => con.length === 1);
  }

  return {
    vowels,
    consonants,
    tone,
  };
};

const getTone = (value: string) => {
  const tail = value.at(-1) || "";
  if (TONES.includes(tail)) {
    return tail;
  }
  return "";
};

const getVowelsByConsonants = (value: string, consonants: string[]) => {
  let vowels: string[] = [];

  // 残りの部分の長さごとに、vowel の候補を探す
  const consonantLengths = getConsonantLengths(consonants);

  for (const length of Object.keys(consonantLengths).map(Number)) {
    const valueOmitToneConsonant = value.slice(length);
    const _vowels = getVowels(valueOmitToneConsonant);

    vowels = [...vowels, ..._vowels];
    vowels = getUniqArray(vowels);
  }
  return vowels;
};

const getUniqArray = <T>(array: T[]) => {
  return array.filter((item, index, self) => self.indexOf(item) === index);
};

const getShortestVowel = (vowels: string[]) => {
  let shortest = "xxxxx"; // 母音の最長は4字なので、初期値は５字に設定
  for (const vowel of vowels) {
    if (shortest.length > vowel.length) {
      shortest = vowel;
    }
  }
  return shortest;
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

const getConsonants = (valueOmittedTone: string) => {
  // 空文字列の場合
  if (!valueOmittedTone) return [];

  // 頭 2文字が子音なら、それを返して、終了
  const headTwo = valueOmittedTone.slice(0, 2);
  const twoChar_consonants =
    CONSONANT_FILTER[headTwo as keyof typeof CONSONANT_FILTER] || [];
  if (!!twoChar_consonants.length) return twoChar_consonants;

  // 頭 1文字が含まれる子音を抽出
  const headOne = valueOmittedTone.slice(0, 1);
  const consonants =
    CONSONANT_FILTER[headOne as keyof typeof CONSONANT_FILTER] || [];

  // 与えられた文字が１文字のみの場合（つまり、子音が入力されていない状態）は
  // 抽出された候補を全て返す
  if (valueOmittedTone.length === 1) {
    return consonants;
  }

  // 与えられた文字が2文字以上の場合
  // 上の 2文字子音のチェックで、false の判定を受けているということは、
  // 2文字子音の可能性はない

  return consonants.filter((c) => c.length === 1);
};

const getVowel = (value: string): string => {
  return VOWELS.includes(value) ? value : "";
};

export const getVowels = (value: string) => {
  return VOWEL_FILTER[value as keyof typeof VOWEL_FILTER] || [];
};

export const isValidPinyin = ({ consonant, vowel, tone }: Pinyin) => {
  // tone, 母音がないのはダメ
  if (!tone || !vowel) return false;

  // 子音がつかなくてはいけない母音
  if (
    [...Object.keys(VOWEL_PAIRS), ...EXTROVERTED_VOWELS].includes(vowel) &&
    !consonant
  )
    return false;

  // 子音がついてはいけない母音
  if (
    [...Object.values(VOWEL_PAIRS), ...INTROVERTED_VOWELS].includes(vowel) &&
    !!consonant
  )
    return false;

  return true;
};

export const buildPinyins = (value: string) => {
  const pinyins: Pinyin[] = [];
  const units = value.split("\u0020").filter(Boolean);
  for (const unit of units) {
    const pinyin = buildPinyin(unit);
    pinyins.push(pinyin);
  }
  return pinyins;
};

export const getConsonantLengths = (consonants: string[]) => {
  if (!consonants.length) return { 0: null };
  return consonants.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.length]: null,
    }),
    {} as { [key: number]: null },
  );
};
