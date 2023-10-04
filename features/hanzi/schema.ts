import { Pinyin } from "../pinyin";

// id は更新、削除に必要
// note Hanzi に latest sentenceId と count を持たせる？
export interface Hanzi {
  id: string;
  form: string;
  pinyin: Pinyin;
}
