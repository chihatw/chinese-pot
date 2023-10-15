export const SEARCH_SENTENCES_MAX = 70;
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
  hanzis: "hanzis",
  invertedIndexes: "invertedIndexes",
  article: "article",
  hanzisByForms: "hanzisByForms", // revalidate されていない
  invertedIndexByForm: "invertedIndexByForm", // revalidate されない
};

export const COLLECTIONS = {
  hanzis: "hanzis",
  articles: "articles",
  sentences: "sentences",
  invertedIndexes: "inverted_indexes", // note invertedIndexes は　エラー
};
