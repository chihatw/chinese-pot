import LangPotArticleList from "./components/LangPotArticleList";
import ARTICLES_JSON from "./json/articles.json";
import SENTENCES_JSON from "./json/sentences.json";
import {
  Article,
  Article_SentenceIds,
  Article_old,
  Article_raw,
  Sentence,
  SentenceMidashiPinyin_raw,
  SentencePinyins_Temp,
  SentenceUniGram,
  SentenceUniGram_raw,
  Sentence_Article_Relation,
  Sentence_Pinyins_Relation,
  Sentence_UniGrams_Relation,
  Sentence_raw,
} from "./shema";

const ARTICLES = ARTICLES_JSON as Article[];
const SENTENCES = SENTENCES_JSON as Sentence[];

export { ARTICLES, LangPotArticleList, SENTENCES };

export type {
  Article,
  Article_SentenceIds,
  Article_old,
  Article_raw,
  Sentence,
  SentenceMidashiPinyin_raw,
  SentencePinyins_Temp,
  SentenceUniGram,
  SentenceUniGram_raw,
  Sentence_Article_Relation,
  Sentence_Pinyins_Relation,
  Sentence_UniGrams_Relation,
  Sentence_raw,
};
