import { Pinyin } from "../pinyin";

// id は更新、削除に必要
// note Hanzi_old に latest sentenceId と count を持たせる？
export interface Hanzi_old {
  id: string;
  form: string;
  pinyin: Pinyin;
}
