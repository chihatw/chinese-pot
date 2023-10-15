import {
  ArticleSentences,
  ArticleSentencesReducerAction,
} from "@/features/articleSentences/schema";
import ArticleSentencesContextProvider, {
  useArticleSentences,
} from "./components/ArticleSentencesContextProvider";

useArticleSentences;

export { ArticleSentencesContextProvider, useArticleSentences };

export type { ArticleSentences, ArticleSentencesReducerAction };
