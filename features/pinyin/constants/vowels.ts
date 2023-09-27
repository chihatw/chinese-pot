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

export const VOWEL_FILTER = {
  a: ["a", "ai", "ao", "an", "ang"],
  o: ["o", "ou", "ong"],
  e: ["e", "ei", "er", "en", "eng"],
  ai: ["ai"],
  ei: ["ei"],
  ao: ["ao"],
  ou: ["ou"],
  er: ["er"],
  an: ["an", "ang"],
  en: ["en", "eng"],
  ang: ["ang"],
  on: ["ong"],
  ong: ["ong"],
  eng: ["eng"],
  u: ["u", "un", "ui", "uo", "ue", "ua", "uan", "uai", "uang"],
  v: ["v", "ve"],
  i: ["i", "in", "iu", "ie", "ia", "ing", "ian", "iao", "iang", "iong"],
  un: ["un"],
  in: ["in", "ing"],
  ui: ["ui"],
  uo: ["uo"],
  iu: ["iu"],
  ve: ["ve"],
  ie: ["ie"],
  ue: ["ue"],
  ua: ["ua", "uan", "uai", "uang"],
  ia: ["ia", "ian", "iao", "iang"],
  ing: ["ing"],
  uan: ["uan", "uang"],
  ian: ["ian", "iang"],
  iao: ["iao"],
  uai: ["uai"],
  uang: ["uang"],
  iang: ["iang"],
  io: ["iong"],
  ion: ["iong"],
  iong: ["iong"],
  y: [
    "yi",
    "yu",
    "ye",
    "ya",
    "yue",
    "you",
    "yao",
    "yai",
    "yin",
    "yun",
    "yan",
    "yuan",
    "ying",
    "yang",
    "yong",
  ],
  yi: ["yi", "yin", "ying"],
  w: ["wu", "wo", "wa", "wei", "wai", "wen", "wan", "wang", "weng"],
  wu: ["wu"],
  yu: ["yu", "yue", "yun", "yuan"],
  wo: ["wo"],
  ye: ["ye"],
  ya: ["ya", "yao", "yai", "yan", "yang"],
  wa: ["wa", "wai", "wan", "wang"],
  we: ["wei", "wen", "weng"],
  wei: ["wei"],
  yue: ["yue"],
  yo: ["you", "yong"],
  you: ["you"],
  yao: ["yao"],
  wai: ["wai"],
  yai: ["yai"],
  yin: ["yin", "ying"],
  wen: ["wen", "weng"],
  yun: ["yun"],
  wan: ["wan", "wang"],
  yan: ["yan", "yang"],
  yua: ["yuan"],
  yuan: ["yuan"],
  ying: ["ying"],
  wang: ["wang"],
  yang: ["yang"],
  yon: ["yong"],
  yong: ["yong"],
  weng: ["weng"],
};

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

export const buildVowelFilter = () => {
  return VOWELS.reduce(
    (acc, cur) => {
      let cloned = { ...acc };
      // 母音から、先頭から1文字、2文字...のように部分文字列を作る
      for (let i = 1; i <= cur.length; i++) {
        const key = cur.slice(0, i);
        cloned = {
          ...cloned,
          // 部分文字列と自身の対応を記録する
          [key]: cloned[key] ? [...cloned[key], cur] : [cur],
        };
      }

      return cloned;
    },
    {} as { [key: string]: string[] },
  );
};
