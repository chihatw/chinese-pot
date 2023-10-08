import SentenceForm from "./components/SentenceForm";
import SentenceLine from "./components/SentenceLine";
import SentenceTable from "./components/SentenceTable";
import SimpleSentenceMonitor from "./components/SimpleSentenceMonitor";
import { Sentence } from "./schema";
import {
  getLastTenSentences,
  getSentencesByForms,
  getSentencesByIds,
  getSentencesCount,
} from "./services/firestore_restapi";

export {
  SentenceForm,
  SentenceLine,
  SentenceTable,
  SimpleSentenceMonitor,
  getLastTenSentences,
  getSentencesByForms,
  getSentencesByIds,
  getSentencesCount,
};

export type { Sentence };
