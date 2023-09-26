const MAJOR_VOWEL_HEAD = ["a", "o", "e"];
const MINOR_VOWEL_HEAD = ["u", "v", "i"];
const HALF_VOWELS_HEAD = ["y", "w"];

// 子音がつかない
export const INTROVERTED_VOWELS = [
  "you",
  "yai",
  "wei",
  "yun",
  "wen",
  "yuan",
  "weng",
];

// 子音が必ずつく
export const EXTROVERTED_VOWELS = ["iu", "un", "ui", "ue"];

// 子音の有無で形が変化
export const VOWEL_PAIRS = {
  i: "yi",
  u: "wu",
  v: "yu",
  uo: "wo",
  ie: "ye",
  ia: "ya",
  ua: "wa",
  uai: "wai",
  ve: "yue",
  iao: "yao",
  in: "yin",
  uan: "wan",
  ian: "yan",
  ing: "ying",
  uang: "wang",
  iang: "yang",
  iong: "yong",
};

// 子音がなくても形が変化しない
export const MAJOR_FULL_VOWELS = [
  "a",
  "o",
  "e",
  "ai",
  "ei",
  "ao",
  "ou",
  "er",
  "an",
  "en",
  "ang",
  "ong",
  "eng",
];

// INTROVERTED_VOWELS + VOWEL_PAIRS
export const HALF_VOWELS = [
  "yi",
  "wu",
  "yu",
  "wo",
  "ye",
  "ya",
  "wa",
  "wei",
  "yue",
  "you",
  "yao",
  "wai",
  "yai",
  "yin",
  "wen",
  "yun",
  "wan",
  "yan",
  "yuan",
  "ying",
  "wang",
  "yang",
  "yong",
  "weng",
];

// EXTROVERTED_VOWELS + VOWEL_PAIRS
export const MINOR_FULL_VOWELS = [
  "u",
  "v",
  "i",
  "un",
  "in",
  "ui",
  "uo",
  "iu",
  "ve",
  "ie",
  "ue",
  "ua",
  "ia",
  "ing",
  "uan",
  "ian",
  "iao",
  "uai",
  "uang",
  "iang",
  "iong",
];

export const VOWELS = [
  ...MAJOR_FULL_VOWELS,
  ...MINOR_FULL_VOWELS,
  ...HALF_VOWELS,
];

export const buildMajorFullVowels = () => {
  const { fullVowels } = buildVowels();
  return fullVowels.filter((vowel) => MAJOR_VOWEL_HEAD.includes(vowel.at(0)!));
};

export const buildMinorFullVowels = () => {
  const { fullVowels } = buildVowels();
  return fullVowels.filter((vowel) => MINOR_VOWEL_HEAD.includes(vowel.at(0)!));
};

export const buildVowels = () => {
  const vowels = vowelsGroups.reduce((acc, cur) => [...acc, ...cur], []);
  const halfVowels: string[] = vowels.filter((vowel) =>
    HALF_VOWELS_HEAD.includes(vowel.at(0)!),
  );
  const fullVowels: string[] = vowels.filter(
    (vowel) => !HALF_VOWELS_HEAD.includes(vowel.at(0)!),
  );
  return { halfVowels, fullVowels };
};

const vowelsGroups = [
  ["a", "o", "e", "u", "v", "i"],
  [
    "yi",
    "wu",
    "yu",
    "an",
    "en",
    "un",
    "in",
    "ai",
    "ei",
    "ui",
    "ao",
    "uo",
    "wo",
    "ou",
    "iu",
    "ve",
    "ie",
    "ue",
    "ye",
    "ua",
    "ia",
    "ya",
    "wa",
    "er",
  ],
  [
    "yin",
    "wen",
    "yun",
    "ang",
    "ong",
    "eng",
    "ing",
    "wei",
    "you",
    "yue",
    "uan",
    "ian",
    "wan",
    "yan",
    "iao",
    "uai",
    "yao",
    "wai",
    "yai",
  ],
  ["ying", "yuan", "uang", "iang", "wang", "yang", "iong", "yong", "weng"],
];
