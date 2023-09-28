import LangPotArticleList from "./components/LangPotArticleList";
import ARTICLES_JSON from "./json/articles.json";
import SENTENCES_JSON from "./json/sentences.json";
import {
  Article,
  Article_SentenceIds,
  Article_old,
  Article_raw,
  Sentence,
  SentenceUniGram,
  SentenceUniGram_row,
  Sentence_Article_Relation,
  Sentence_UniGrams_Relation,
  Sentence_raw,
} from "./shema";

const ARTICLES = ARTICLES_JSON as Article[];
const SENTENCES = SENTENCES_JSON.map((i) => ({
  ...i,
  pinyins: (i as any).pinyins || [],
})) as Sentence[];

export { ARTICLES, LangPotArticleList, SENTENCES };

export type {
  Article,
  Article_SentenceIds,
  Article_old,
  Article_raw,
  Sentence,
  SentenceUniGram,
  SentenceUniGram_row,
  Sentence_Article_Relation,
  Sentence_UniGrams_Relation,
  Sentence_raw,
};
