import { dbAdmin } from "@/firebase/admin";
import { FirestoreDataConverter } from "firebase-admin/firestore";
import { InvertedIndex } from "..";

const COLLECTION = "invertedIndexes";

export const batchAddInvertedIndexes = async (
  invertedIndexes: InvertedIndex[],
) => {
  const batch = dbAdmin.batch();
  for (const invertedIndex of invertedIndexes) {
    batch.set(
      dbAdmin
        .collection(COLLECTION)
        .withConverter(invertedIndexConverter)
        .doc(invertedIndex.id),
      invertedIndex,
    );
  }
  batch.commit();
};

export const getInvertedIndexesCount = async () => {
  const snapshot = await dbAdmin.collection(COLLECTION).count().get();
  return snapshot.data().count;
};

export const getInvertedIndexByForm = async (form: string) => {
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(invertedIndexConverter)
    .where("form", "==", form)
    .get();
  return snapshot.docs.at(0)?.data();
};

export const getInvertedIndexesByForms = async (forms: string[]) => {
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(invertedIndexConverter)
    .where("form", "in", forms)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

export const invertedIndexConverter: FirestoreDataConverter<InvertedIndex> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      form: data.form,
      count: data.count,
      sentenceIds: data.sentenceIds,
    };
  },
  toFirestore(invertedIndex) {
    return {
      form: invertedIndex.form,
      count: invertedIndex.count,
      sentenceIds: invertedIndex.sentenceIds,
    };
  },
};
