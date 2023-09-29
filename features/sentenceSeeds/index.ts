import ARTICLES_JSON from "./json/ARTICLES.json";
import SENTENCES_JSON from "./json/SENTENCES.json";
import SENTENCE_UNIGRAMS_JSON from "./json/SENTENCE_UNIGRAMS.json";
import {
  Article_old,
  Article_raw,
  SentenceMidashiPinyin_raw,
  SentencePinyins_Temp,
  SentenceUnigram_raw,
  Sentence_Article_Relation,
  Sentence_old,
  Sentence_raw,
} from "./schema";

import { Article } from "../article";
import { Sentence } from "../sentence";
import { SentenceUnigram } from "../sentenceUnigram";
import BatchAddArticlesButton from "./components/BatchAddArticlesButton";
import BatchAddSentenceUnigramsButton from "./components/BatchAddSentenceUnigramsButton";
import BatchAddSentencesButton from "./components/BatchAddSentencesButton";

const ARTICLES = ARTICLES_JSON as Article[];
const SENTENCES = SENTENCES_JSON as Sentence[];
const SENTENCE_UNIGRAMS = SENTENCE_UNIGRAMS_JSON as SentenceUnigram[];

export {
  ARTICLES,
  BatchAddArticlesButton,
  BatchAddSentenceUnigramsButton,
  BatchAddSentencesButton,
  SENTENCES,
  SENTENCE_UNIGRAMS,
};

export type {
  Article_old,
  Article_raw,
  SentenceMidashiPinyin_raw,
  SentencePinyins_Temp,
  SentenceUnigram_raw,
  Sentence_Article_Relation,
  Sentence_old,
  Sentence_raw,
};
