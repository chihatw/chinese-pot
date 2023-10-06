import ArticleForm from "./components/ArticleForm";
import ArticleList from "./components/ArticleList";
import ArticleSentences from "./components/ArticleSentences";
import CreateArticleButton from "./components/CreateArticleButton";
import RandomArticleSentences from "./components/RandomArticleSentences";
import { Article } from "./schema";
import { getArticle } from "./services/firebase";

export {
  ArticleForm,
  ArticleList,
  ArticleSentences,
  CreateArticleButton,
  RandomArticleSentences,
  getArticle,
};

export type { Article };
