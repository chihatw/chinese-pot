// pinyin での検索は想定せず
export interface SentenceUnigram {
  id: string;
  form: string;
  offset: number;
  sentenceId: string;
}
