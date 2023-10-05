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
import PinyinHanzi from "./components/PinyinHanzi";

const HANZI_SENTENCE_RELATIONS = HANZI_SENTENCE_RELATIONS_JSON as {
  [key: string]: string[];
};

const HANZIS = HANZIS_JSON as Hanzi[];

export {
  HANZIS,
  HANZI_SENTENCE_RELATIONS,
  HanziList,
  PinyinHanzi,
  buildHanziFromId,
  buildHanziId,
  getHanzisByVowel,
  getVowelCounts,
};

export type { Hanzi };
