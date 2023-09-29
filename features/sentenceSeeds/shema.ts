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
  pinyinsStr: string;
  createdAt: number;
}

export interface Sentence_old {
  id: string;
  text: "";
  pinyins: (Pinyin | undefined)[];
  createdAt: number;
}

// pinyin での検索は想定せず
export interface SentenceUniGram {
  id: string;
  form: string;
  offset: number;
  sentenceId: string;
}

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

export interface Sentence_Pinyins_Relation {
  [sentenceId: string]: Pinyin[];
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

export interface SentenceUniGram_raw {
  _id: string;
  char: string;
  sentenceId: string;
  offset: number;
}

export interface SentenceMidashiPinyin_raw {
  _id: string;
  yomi: string;
  offset: number;
  sentenceId: string;
}

export interface SentencePinyins_Temp {
  offset: number;
  pinyin: (Pinyin | undefined)[];
}
