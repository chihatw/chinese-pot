export type VowelType = "major" | "minor" | "half";

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
