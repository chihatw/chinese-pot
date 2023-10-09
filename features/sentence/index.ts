import BatchAddSentencesButton from "./components/BatchAddSentencesButton";
import SentenceLine from "./components/SentenceLine";
import SentenceTable from "./components/SentenceTable";
import SimpleSentenceMonitor from "./components/SimpleSentenceMonitor";
import { Sentence } from "./schema";
import {
  batchAddSentencesAction,
  removeSentenceAction,
} from "./services/actions";
import {
  getLastTenSentences,
  getSentence,
  getSentencesByForms,
  getSentencesByIds,
} from "./services/firestore_restapi";
import {
  buildHanzisFromSentence,
  buildHanzisGroupedByConsonantVowel,
  buildSentenceChars,
} from "./services/utils";

export {
  BatchAddSentencesButton,
  SentenceLine,
  SentenceTable,
  SimpleSentenceMonitor,
  batchAddSentencesAction,
  buildHanzisFromSentence,
  buildHanzisGroupedByConsonantVowel,
  buildSentenceChars,
  getLastTenSentences,
  getSentence,
  getSentencesByForms,
  getSentencesByIds,
  removeSentenceAction,
};

export type { Sentence };
