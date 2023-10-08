import SearchResultList from "./components/SearchResultList";
import SearchSentencesByForms from "./components/SearchSentencesByForms";
import { FORM_SEARCH_KEY } from "./constants";
import { InvertedIndex } from "./schema";
import {
  getInvertedIndexByForm,
  getInvertedIndexesByForms,
  getInvertedIndexesCount,
} from "./services/firestore_restapi";

export {
  FORM_SEARCH_KEY,
  SearchResultList,
  SearchSentencesByForms,
  getInvertedIndexByForm,
  getInvertedIndexesByForms,
  getInvertedIndexesCount,
};
export type { InvertedIndex };
