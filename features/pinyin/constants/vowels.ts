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
export const VOWEL_PAIRS: { [key: string]: string } = {
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
export const MAJOR_VOWELS = [
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

export const VOWELS = [
  ...MAJOR_VOWELS,
  ...Object.keys(VOWEL_PAIRS),
  ...Object.keys(VOWEL_PAIRS).map((key) => VOWEL_PAIRS[key]),
  ...EXTROVERTED_VOWELS,
  ...INTROVERTED_VOWELS,
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
  ["a", "o", "e", "u", "v", "i"], // 6
  [
    "ai",
    "ao",
    "an",
    "ia",
    "iu",
    "ie",
    "in",
    "ya",
    "yi",
    "yu",
    "ye",
    "ua",
    "ui",
    "uo",
    "ue",
    "un",
    "wu",
    "wo",
    "wa",
    "ve",
    "ei",
    "er",
    "en",
    "ou",
  ], // 24
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
  ], // 19
  ["ying", "yuan", "uang", "iang", "wang", "yang", "iong", "yong", "weng"], // 9
];
