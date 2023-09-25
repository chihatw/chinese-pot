import { Pinyin } from "../pinyin";

// hanzi は使用頻度が高い項目だけを持たせる
export interface Hanzi {
  id: string;
  form: string;
  pinyin: Pinyin;
}

// 使用頻度が低い項目はこちらに
export interface HanziMeta {
  id: string;
  createdAt: number;
  updatedAt: number;
}
