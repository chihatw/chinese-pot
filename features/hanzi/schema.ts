import { Pinyin } from "../pinyin";

export interface Hanzi {
  id: string;
  form: string;
  pinyin: Pinyin;
  count: number;
  latestSentenceId: string;
}
