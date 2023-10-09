// https://firebase.google.com/docs/reference/js/v8/firebase.auth.Error#message

export const ERROR_CODES = {
  "auth/user-not-found": "auth/user-not-found",
  "auth/wrong-password": "auth/wrong-password",
  "auth/too-many-requests": "auth/too-many-requests",
  "auth/email-already-in-use": "auth/email-already-in-use",
};

export const DOCUMENTID_COUNT_MAX = 10;

export const PROJECT_ID = "chinese-pot";

// noto index を通すと、 not found になる
export const REVALIDATE_TAGS = {
  senences: "sentences",
  articles: "articles",
  hanzis: "hanzis",
  invertedIndexes: "invertedIndexes",
};
