import { Sentence } from "@/features/sentence";
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

export const getSentenceByform = async (
  form: string,
): Promise<{ total: number; sentences: Sentence[] }> => {
  console.log("get sentence count by form");
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(SentenceUnigramConvertor)
    .where("form", "==", form)
    .get();

  const sentenceIds = snapshot.docs
    .map((doc) => doc.data())
    .reduce((acc, cur) => {
      // すでに既出の場合、重複追加はしない
      if (acc.includes(cur.sentenceId)) {
        return acc;
      }
      // sentnceId で配列を作成
      return [...acc, cur.sentenceId];
    }, [] as string[]);

  const sentences = await getSentencesByIds(sentenceIds.slice(0, 30));
  return { sentences, total: sentenceIds.length };
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
