const MAJOR_VOWEL_HEAD = ["a", "o", "e"];
const MINOR_VOWEL_HEAD = ["u", "v", "i"];
const HALF_VOWELS_HEAD = ["y", "w"];

export const HALF_VOWELS = [
  "yi",
  "wu",
  "yu",
  "wo",
  "ye",
  "ya",
  "wa",
  "yin",
  "wen",
  "yun",
  "wei",
  "you",
  "yue",
  "wan",
  "yan",
  "yao",
  "wai",
  "yai",
  "ying",
  "yuan",
  "wang",
  "yang",
  "yong",
  "weng",
];

export const MAJOR_FULL_VOWELS = [
  "a",
  "o",
  "e",
  "an",
  "en",
  "ai",
  "ei",
  "ao",
  "ou",
  "er",
  "ang",
  "ong",
  "eng",
];

export const MINOR_FULL_VOWELS = [
  "u",
  "v",
  "i",
  "un",
  "vn",
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
  "van",
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
    "vn",
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
    "van",
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
