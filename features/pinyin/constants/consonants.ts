export const ONE_CHAR_CONSONANTS = [
  "b",
  "p",
  "m",
  "f",
  "d",
  "t",
  "n",
  "l",
  "z",
  "c",
  "s",
  "r",
  "j",
  "q",
  "x",
  "g",
  "k",
  "h",
];

export const buildOneCharConsonants = "bpmfdtnlzcsrjqxgkh".split("");

export const TWO_CHAR_CONSONANTS = ["zh", "ch", "sh"];

export const CONSONANTS = [...ONE_CHAR_CONSONANTS, ...TWO_CHAR_CONSONANTS];

export const CONSONANT_FILTER = {
  b: ["b"],
  p: ["p"],
  m: ["m"],
  f: ["f"],
  d: ["d"],
  t: ["t"],
  n: ["n"],
  l: ["l"],
  z: ["z", "zh"],
  c: ["c", "ch"],
  s: ["s", "sh"],
  r: ["r"],
  j: ["j"],
  q: ["q"],
  x: ["x"],
  g: ["g"],
  k: ["k"],
  h: ["h"],
  zh: ["zh"],
  ch: ["ch"],
  sh: ["sh"],
};

export const buildConsonantFilter = () => {
  return CONSONANTS.reduce(
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
