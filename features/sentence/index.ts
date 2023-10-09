import BatchAddSentencesButton from "./components/BatchAddSentencesButton";
import SentenceForm from "./components/SentenceForm";
import SentenceLine from "./components/SentenceLine";
import SentenceTable from "./components/SentenceTable";
import SimpleSentenceMonitor from "./components/SimpleSentenceMonitor";
import { Sentence } from "./schema";
import {
  getLastTenSentences,
  getSentence,
  getSentencesByForms,
  getSentencesByIds,
} from "./services/firestore_restapi";

export {
  BatchAddSentencesButton,
  SentenceForm,
  SentenceLine,
  SentenceTable,
  SimpleSentenceMonitor,
  getLastTenSentences,
  getSentence,
  getSentencesByForms,
  getSentencesByIds,
};

export type { Sentence };
