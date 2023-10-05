import HanziForm from "./components/HanziForm";
import HanziList from "./components/HanziList";
import PinyinHanzi from "./components/PinyinHanzi";
import HANZI_SENTENCE_RELATIONS_JSON from "./json/hanzi_sentence_relations.json";
import { Hanzi, Hanzi_old } from "./schema";
import { buildHanziFromId, buildHanziId } from "./services/util";

import HANZIS_JSON from "./json/hanzis.json";

const HANZI_SENTENCE_RELATIONS = HANZI_SENTENCE_RELATIONS_JSON as {
  [key: string]: string[];
};

const HANZIS = HANZIS_JSON as Hanzi[];

export {
  HANZIS,
  HANZI_SENTENCE_RELATIONS,
  HanziForm,
  HanziList,
  PinyinHanzi,
  buildHanziFromId,
  buildHanziId,
};

export type { Hanzi_old };
