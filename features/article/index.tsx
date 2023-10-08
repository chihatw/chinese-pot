import ArticleForm from "./components/ArticleForm";
import ArticleList from "./components/ArticleList";
import ArticleSentences from "./components/ArticleSentences";
import CreateArticleButton from "./components/CreateArticleButton";
import RandomArticleSentences from "./components/RandomArticleSentences";
import { Article } from "./schema";

import {
  getArticle,
  getArticleCount,
  getRecentArticles,
} from "./services/firestore_restapi";

export {
  ArticleForm,
  ArticleList,
  ArticleSentences,
  CreateArticleButton,
  RandomArticleSentences,
  getArticle,
  getArticleCount,
  getRecentArticles,
};

export type { Article };
