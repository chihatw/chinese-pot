export type VowelType = "major" | "minor" | "half";

export interface Pinyin {
  vowel: string;
  consonant: string;
  tone: string;
}
