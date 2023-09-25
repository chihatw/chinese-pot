import {
  HALF_VOWELS,
  MAJOR_FULL_VOWELS,
  MINOR_FULL_VOWELS,
  ONE_CHAR_CONSONANTS,
  Pinyin,
  TONES,
  TWO_CHAR_CONSONANTS,
} from "..";

export const buildPinyin = (value: string): Pinyin | undefined => {
  const tail = value.at(-1) || "";
  let tone = "";
  if (TONES.includes(tail)) {
    tone = tail;
  }
  const valueOmitTone = !!tail ? value.slice(0, value.length - 1) : value;
  const consonant = getConsonant(valueOmitTone);
  const valueOmitToneConsonant = valueOmitTone.slice(consonant.length);

  const { vowel, vowelType } = getVowel(valueOmitToneConsonant);

  let pinyin: Pinyin | undefined = undefined;

  // トーン必須
  if (!!tone) {
    // 母音と子音の組み合わせをチェック
    if (isValidPinyin({ consonant, vowel, vowelType })) {
      pinyin = {
        tone,
        consonant,
        vowel,
        vowelType,
      };
    }
  }

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

const getVowel = (value: string): Pick<Pinyin, "vowel" | "vowelType"> => {
  if (MAJOR_FULL_VOWELS.includes(value)) {
    return {
      vowel: value,
      vowelType: "major",
    };
  }

  if (MINOR_FULL_VOWELS.includes(value)) {
    return {
      vowel: value,
      vowelType: "minor",
    };
  }

  if (HALF_VOWELS.includes(value)) {
    return {
      vowel: value,
      vowelType: "half",
    };
  }
  return {
    vowel: "",
    vowelType: undefined,
  };
};

const isValidPinyin = ({
  consonant,
  vowel,
  vowelType,
}: Omit<Pinyin, "tone">) => {
  // 母音がないのは異常
  if (!vowel) return false;

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
