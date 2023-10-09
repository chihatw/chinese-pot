import ArticleForm from "./components/ArticleForm";
import ArticleList from "./components/ArticleList";
import ArticleSentences from "./components/ArticleSentences";
import BatchAddArticlesButton from "./components/BatchAddArticlesButton";
import CreateArticleButton from "./components/CreateArticleButton";
import { Article } from "./schema";

import { getArticle, getRecentArticles } from "./services/firestore_restapi";

export {
  ArticleForm,
  ArticleList,
  ArticleSentences,
  BatchAddArticlesButton,
  CreateArticleButton,
  getArticle,
  getRecentArticles,
};

export type { Article };
