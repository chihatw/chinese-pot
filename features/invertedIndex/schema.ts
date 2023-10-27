import { Sentence } from "../sentence";

export interface InvertedIndex {
  id: string;
  form: string; // id から復元できるので、不要なのでは？ 人間用？
  count: number; // hanzi.count と重複するので、不要なのでは？
  sentenceIds: string[];
}

export interface SearchResult {
  total: number;
  sentences: Sentence[];
}
