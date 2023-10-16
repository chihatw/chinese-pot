// "use client";

// import { Sentence } from "@/features/sentence";
// import {
//   ReactNode,
//   createContext,
//   useContext,
//   experimental_useOptimistic as useOptimistic,
// } from "react";
// import { INITIAL_ARTICLE_SENTENCES } from "../constants";
// import { ArticleSentences, ArticleSentencesReducerAction } from "../schema";

// const ArticleSentencesContext = createContext<{
//   optimisticValue: ArticleSentences;
//   dispatch: (action: ArticleSentencesReducerAction) => void;
// }>({
//   optimisticValue: INITIAL_ARTICLE_SENTENCES,
//   dispatch: (action: ArticleSentencesReducerAction) => {},
// });

// const reducer = (
//   state: ArticleSentences,
//   action: ArticleSentencesReducerAction,
// ): ArticleSentences => {
//   let sentences: Sentence[] = [];
//   switch (action.type) {
//     case "SET":
//       const value = action.payload as ArticleSentences;
//       return value;

//     case "ADD_SENTENCE":
//       if (!state.article) return INITIAL_ARTICLE_SENTENCES;
//       const sentence = action.payload as Sentence;
//       sentences = [...state.sentences, sentence];
//       return {
//         article: { ...state.article, sentenceIds: sentences.map((s) => s.id) },
//         sentences,
//       };

//     case "DELETE_SENTENCE":
//       if (!state.article) return INITIAL_ARTICLE_SENTENCES;
//       const sentenceId = action.payload as string;
//       sentences = state.sentences.filter((s) => s.id !== sentenceId);
//       return {
//         article: { ...state.article, sentenceIds: sentences.map((s) => s.id) },
//         sentences,
//       };
//   }
// };

// export const useArticleSentences = () => {
//   const context = useContext(ArticleSentencesContext);

//   if (!context) {
//     throw new Error("out of context");
//   }

//   return context;
// };

// const ArticleSentencesContextProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   const [optimisticValue, dispatch] = useOptimistic(
//     INITIAL_ARTICLE_SENTENCES,
//     reducer,
//   );
//   return (
//     <ArticleSentencesContext.Provider value={{ optimisticValue, dispatch }}>
//       {children}
//     </ArticleSentencesContext.Provider>
//   );
// };

// export default ArticleSentencesContextProvider;
