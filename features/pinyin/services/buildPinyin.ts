import {
  CONSONANT_FILTER,
  HALF_VOWELS,
  MAJOR_FULL_VOWELS,
  MINOR_FULL_VOWELS,
  ONE_CHAR_CONSONANTS,
  Pinyin,
  PinyinFilter,
  TONES,
  TWO_CHAR_CONSONANTS,
  VOWELS,
  VOWEL_FILTER,
  VowelType,
} from "..";

export const buildPinyin = (value: string): Pinyin | undefined => {
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
  value = !!tone ? value.slice(0, value.length - 1) : value;
  let consonants = getConsonants(value);

  if (!!tone && consonants.length === 2) {
    consonants = consonants.filter((con) => con.length === 1);
  }

  let vowels = getVowelsByConsonants(value, consonants);

  if (!!tone) {
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

export const getConsonants = (value: string) => {
  let consonants: string[] = [];
  const headTwo = value.slice(0, 2);
  consonants = CONSONANT_FILTER[headTwo as keyof typeof CONSONANT_FILTER] || [];
  if (!!consonants.length) return consonants;
  const headOne = value.slice(0, 1);
  return CONSONANT_FILTER[headOne as keyof typeof CONSONANT_FILTER] || [];
};

const getVowel = (value: string): string => {
  return VOWELS.includes(value) ? value : "";
};

export const getVowels = (value: string) => {
  return VOWEL_FILTER[value as keyof typeof VOWEL_FILTER] || [];
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
