import LangPotArticleList from "./components/LangPotSentenceList";
import ARTICLES_JSON from "./json/ARTICLES.json";
import SENTENCES_JSON from "./json/SENTENCES.json";
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
  Sentence_old,
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
  Sentence_old,
  Sentence_raw,
};
