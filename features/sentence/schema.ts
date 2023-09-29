// 🌟 Sentence は基本。text, pinyins を自身で持つ。
export interface Sentence {
  id: string;
  text: "";
  pinyinsStr: string;
  createdAt: number;
}

// pinyin での検索は想定せず
export interface SentenceUnigram {
  id: string;
  form: string;
  offset: number;
  sentenceId: string;
}
