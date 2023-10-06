export interface Pinyin {
  vowel: string;
  consonant: string;
  tone: string;
}
export interface PinyinFilter {
  vowels: string[];
  consonants: string[];
  tone: string;
}

export const INITIAL_PINYIN: Pinyin = {
  vowel: "",
  consonant: "",
  tone: "",
};

export const INITIAL_PINYIN_FILTERL: PinyinFilter = {
  vowels: [],
  consonants: [],
  tone: "",
};
