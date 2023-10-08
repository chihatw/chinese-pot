import SentenceForm from "./components/SentenceForm";
import SentenceLine from "./components/SentenceLine";
import SimpleSentenceMonitor from "./components/SimpleSentenceMonitor";
import { Sentence } from "./schema";
import {
  getSentencesByForms,
  getSentencesByIds,
  getSentencesCount,
} from "./services/firestore_restapi";

export {
  SentenceForm,
  SentenceLine,
  SimpleSentenceMonitor,
  getSentencesByForms,
  getSentencesByIds,
  getSentencesCount,
};

export type { Sentence };
