import BuildInvetedIndexesButton from "./components/BuildInvetedIndexesButton";
import SearchResultList from "./components/SearchResultList";
import SearchSentencesByForms from "./components/SearchSentencesByForms";

import { InvertedIndex } from "./schema";
import {
  getInvertedIndexByForm,
  getInvertedIndexesByForms,
} from "./services/firestore_restapi";

export {
  BuildInvetedIndexesButton,
  SearchResultList,
  SearchSentencesByForms,
  getInvertedIndexByForm,
  getInvertedIndexesByForms,
};
export type { InvertedIndex };
