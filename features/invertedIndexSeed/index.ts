import { InvertedIndex } from "../invertedIndex";
import BuildInvetedIndexesButton from "./components/BuildInvetedIndexesButton";

import INVERTED_INDEXES_JSON from "./json/inverted_indexes.json";

const INVERTED_INDEXES = INVERTED_INDEXES_JSON as InvertedIndex[];

export { BuildInvetedIndexesButton, INVERTED_INDEXES };
