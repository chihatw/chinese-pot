export type VowelType = "major" | "minor" | "half";

export interface Pinyin {
  vowel: string;
  vowelType: VowelType | undefined;
  consonant: string;
  tone: string;
}
