export const SENTENCE_TEXT_MAX = 200; // sentenceForm sentenceのtextの最大は200字
export const SEARCH_SENTENCES_MAX = 70;
export const IN_ARRAY_MAX = 30;
export const SEARCH_ARTICLES_BY_SENTENCEIDS_MAX = 20;

// https://firebase.google.com/docs/reference/js/v8/firebase.auth.Error#message
export const ERROR_CODES = {
  "auth/user-not-found": "auth/user-not-found",
  "auth/wrong-password": "auth/wrong-password",
  "auth/too-many-requests": "auth/too-many-requests",
  "auth/email-already-in-use": "auth/email-already-in-use",
};

export const REVALIDATE_TAGS = {
  senences: "sentences",
  articles: "articles",
  invertedIndexes: "invertedIndexes",
  article: "article",
  sentenceForm: "sentenceForm",
  invertedIndexByForm: "invertedIndexByForm", // revalidate されない
};

export const COLLECTIONS = {
  hanzis: "hanzis",
  articles: "articles",
  sentences: "sentences",
  invertedIndexes: "inverted_indexes", // note invertedIndexes は　エラー
};
