import { Article } from "@/features/article";
import { Sentence } from "@/features/sentence";

export interface ArticleSentences {
  article: Article | undefined;
  sentences: Sentence[];
}

export interface ArticleSentencesReducerAction {
  type: "SET" | "ADD_SENTENCE" | "DELETE_SENTENCE";
  payload: ArticleSentences | Sentence | string;
}
