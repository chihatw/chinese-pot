import { Pinyin } from "../pinyin";

export interface Article {
  id: string;
  title: string;
  createdAt: number;
  sentenceIds: string[];
}

// 🌟 Sentence は基本。text, pinyins を自身で持つ。
export interface Sentence {
  id: string;
  text: "";
  pinyins: Pinyin[];
  createdAt: number;
}

// pinyin での検索は想定せず
export interface SentenceUniGram {
  id: string;
  form: string;
  offset: number;
  sentenceId: string;
}

// todo 後で変更する
// article に sentenceIds を持たせる ✅
// sentence は id, 文字列, createdAt ✅
// 文字列は unigram 登録で全文検索対応させる
// bigram を持たせれば通信を減らせる
export interface Sentence_Article_Relation {
  id: string;
  index: number;
  articleId: string;
  createdAt: number;
}

export interface Article_SentenceIds {
  [articleId: string]: string[];
}

export interface Sentence_UniGrams_Relation {
  [sentenceId: string]: SentenceUniGram[];
}

export interface Article_raw {
  _id: string;
  title: string;
  createdAt: {
    $numberLong: string;
  };
  tags: string[];
}

export interface Sentence_raw {
  _id: string;
  index: number;
  articleId: string;
  createdAt: {
    $numberLong: string;
  };
}

export interface Article_old {
  id: string;
  title: string;
  createdAt: number;
}

export interface SentenceUniGram_row {
  _id: string;
  char: string;
  sentenceId: string;
  offset: number;
}
