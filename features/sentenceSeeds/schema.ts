import { Pinyin } from "../pinyin";

export interface Sentence_old {
  id: string;
  text: "";
  pinyins: (Pinyin | undefined)[];
  createdAt: number;
}

// 文字列は unigram 登録で全文検索対応させる
// bigram を持たせれば通信を減らせる
export interface Sentence_Article_Relation {
  id: string;
  index: number;
  articleId: string;
  createdAt: number;
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

// lang-pot.sentence_midashi_zhs.json 用
export interface SentenceUnigram_raw {
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
