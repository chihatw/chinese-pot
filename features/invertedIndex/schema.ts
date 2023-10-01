import { Sentence } from "../sentence";

export interface InvertedIndex {
  id: string;
  form: string;
  count: number;
  sentenceIds: string[];
}

export interface SearchResult {
  total: number;
  sentences: Sentence[];
}
