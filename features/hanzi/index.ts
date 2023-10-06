import HANZI_SENTENCE_RELATIONS_JSON from "./json/hanzi_sentence_relations.json";
import { Hanzi } from "./schema";
import {
  buildHanziFromId,
  buildHanziId,
  getHanzisByVowel,
  getVowelCounts,
} from "./services/util";

import HANZIS_JSON from "./json/hanzis.json";

import HanziList from "./components/HanziList";
import PinyinFilterMonitor from "./components/HanziList/PinyinFilterContainer/PinyinFilterMonitor";
import PinyinHanzi from "./components/PinyinHanzi";
import { getHanzisByPinyinFilter_client } from "./services/firebase_client";

const HANZI_SENTENCE_RELATIONS = HANZI_SENTENCE_RELATIONS_JSON as {
  [key: string]: string[];
};

const HANZIS = HANZIS_JSON as Hanzi[];

export {
  HANZIS,
  HANZI_SENTENCE_RELATIONS,
  HanziList,
  PinyinFilterMonitor,
  PinyinHanzi,
  buildHanziFromId,
  buildHanziId,
  getHanzisByPinyinFilter_client,
  getHanzisByVowel,
  getVowelCounts,
};

export type { Hanzi };
