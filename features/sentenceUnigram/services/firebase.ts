import { dbAdmin } from "@/firebase/admin";
import { FirestoreDataConverter } from "firebase-admin/firestore";
import { SentenceUnigram } from "..";

const COLLECTION = "sentenceUnigrams";

export const getSentenceUnigramsCount = async () => {
  console.log("get sentence unigrams count");
  const snapshot = await dbAdmin.collection(COLLECTION).count().get();
  return snapshot.data().count;
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
