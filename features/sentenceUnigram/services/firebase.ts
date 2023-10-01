import { getSentencesByIds } from "@/features/sentence/services/firebase";
import { dbAdmin } from "@/firebase/admin";
import { FirestoreDataConverter } from "firebase-admin/firestore";
import { SentenceUnigram } from "..";

const COLLECTION = "sentenceUnigrams";

export const getSentenceUnigramsCount = async () => {
  console.log("get sentence unigrams count");
  const snapshot = await dbAdmin.collection(COLLECTION).count().get();
  return snapshot.data().count;
};

export const getSentencesByOneForm = async (form: string) => {
  // 引数チェック
  if (!form) return [];

  const sentenceUnigrams = await getSentenceUnigramsByForm(form);

  const sentenceIds = sentenceUnigrams
    .map((unigram) => unigram.sentenceId)
    .filter((item, index, self) => self.indexOf(item) === index);

  const sentences = await getSentencesByIds(sentenceIds);
  return sentences;
};

const getSentenceUnigramsByForm = async (form: string) => {
  console.log(`get sentenceUnigrams by ${form}`);
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(SentenceUnigramConvertor)
    .where("form", "==", form)
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

export const batchAddSentenceUnigrams = async (unigrams: SentenceUnigram[]) => {
  const batch = dbAdmin.batch();
  for (const unigram of unigrams) {
    batch.set(
      dbAdmin
        .collection(COLLECTION)
        .withConverter(SentenceUnigramConvertor)
        .doc(unigram.id),
      unigram,
    );
  }
  console.log("batch add sentence unigrams");
  await batch.commit();
};

const SentenceUnigramConvertor: FirestoreDataConverter<SentenceUnigram> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      form: data.form,
      offset: data.offset,
      sentenceId: data.sentenceId,
    };
  },
  toFirestore(sentenceUnigram) {
    return {
      form: sentenceUnigram.form,
      offset: sentenceUnigram.offset,
      sentenceId: sentenceUnigram.sentenceId,
    };
  },
};
