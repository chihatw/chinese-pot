import { dbAdmin } from "@/firebase/admin";
import { COLLECTIONS } from "@/firebase/constants";
import { FieldValue, FirestoreDataConverter } from "firebase-admin/firestore";
import { nanoid } from "nanoid";
import { InvertedIndex } from "./schema";

const COLLECTION = COLLECTIONS.invertedIndexes;

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

export const createInvertedIndex_in_batch = (
  batch: FirebaseFirestore.WriteBatch,
  form: string,
  sentenceId: string,
) => {
  const id = nanoid(8);
  batch.set(
    dbAdmin
      .collection("invertedIndexes")
      .withConverter(invertedIndexConverter)
      .doc(id),
    {
      id,
      form,
      count: 1,
      sentenceIds: [sentenceId],
    },
  );
};

export const incrementInvertedIndexCount_in_batch = (
  batch: FirebaseFirestore.WriteBatch,
  invertedIndexId: string,
  sentenceId: string,
) => {
  batch.update(
    dbAdmin
      .collection("invertedIndexes")
      .withConverter(invertedIndexConverter)
      .doc(invertedIndexId),
    {
      count: FieldValue.increment(1),
      sentenceIds: FieldValue.arrayUnion(sentenceId),
    },
  );
};

export const decrementInvertedIndexCount_in_batch = (
  batch: FirebaseFirestore.WriteBatch,
  invertedIndexId: string,
  sentenceId: string,
) => {
  batch.update(
    dbAdmin
      .collection("invertedIndexes")
      .withConverter(invertedIndexConverter)
      .doc(invertedIndexId),
    {
      count: FieldValue.increment(-1),
      sentenceIds: FieldValue.arrayRemove(sentenceId),
    },
  );
};

const invertedIndexConverter: FirestoreDataConverter<InvertedIndex> = {
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
