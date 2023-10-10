import { Hanzi } from "@/features/hanzi";
import {
  decrementHanziCount_in_batch,
  updateHanzi_in_batch,
} from "@/features/hanzi/firebase";
import { getInvertedIndexesByForms } from "@/features/invertedIndex";
import {
  createInvertedIndex_in_batch,
  decrementInvertedIndexCount_in_batch,
  incrementInvertedIndexCount_in_batch,
} from "@/features/invertedIndex/firebase";
import { Sentence } from "@/features/sentence";
import { dbAdmin } from "@/firebase/admin";
import { COLLECTIONS } from "@/firebase/constants";
import { FieldValue, FirestoreDataConverter } from "firebase-admin/firestore";

const COLLECTION = COLLECTIONS.sentences;

export const batchAddSentences = async (sentences: Sentence[]) => {
  console.log("batch add sentences");
  const batch = dbAdmin.batch();
  for (const sentence of sentences) {
    batch.set(
      dbAdmin
        .collection(COLLECTION)
        .withConverter(sentenceConverter)
        .doc(sentence.id),
      sentence,
    );
  }
  await batch.commit();
};

// noto addSentence を index に通すと、エラー
export const addSentence = async (
  sentence: Sentence,
  hanzis: Hanzi[],
  articleId?: string,
) => {
  const forms = [...new Set(sentence.text.split(""))];
  const invertedIndexes = await getInvertedIndexesByForms(forms);

  const batch = dbAdmin.batch();

  for (const form of forms) {
    const invertedIndex = invertedIndexes.find((i) => i.form === form);
    if (!invertedIndex) {
      createInvertedIndex_in_batch(batch, form, sentence.id);
    } else {
      incrementInvertedIndexCount_in_batch(
        batch,
        invertedIndex.id,
        sentence.id,
      );
    }
  }

  for (const hanzi of hanzis) {
    updateHanzi_in_batch(batch, hanzi);
  }

  createSentence_in_batch(batch, sentence);

  if (!!articleId) {
    batch.update(dbAdmin.collection("articles").doc(articleId), {
      sentenceIds: FieldValue.arrayUnion(sentence.id),
    });
  }

  batch.commit();
};

export const removeSentence = async (
  sentence: Sentence,
  hanzis: Hanzi[],
  articleId?: string,
) => {
  const forms = [...new Set(sentence.text.split(""))];
  const invertedIndexes = await getInvertedIndexesByForms(forms);

  const batch = dbAdmin.batch();

  for (const form of forms) {
    const invertedIndex = invertedIndexes.find((i) => i.form === form);
    if (!invertedIndex) throw new Error("invertedIndex cannot find");
    decrementInvertedIndexCount_in_batch(batch, invertedIndex.id, sentence.id);
  }

  for (const hanzi of hanzis) {
    decrementHanziCount_in_batch(batch, hanzi.id);
  }

  deleteSentence_in_batch(batch, sentence.id);

  if (!!articleId) {
    batch.update(dbAdmin.collection("articles").doc(articleId), {
      sentenceIds: FieldValue.arrayRemove(sentence.id),
    });
  }

  try {
    batch.commit();
  } catch (e) {
    console.log(e);
  }
};

const sentenceConverter: FirestoreDataConverter<Sentence> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      text: data.text,
      pinyinsStr: data.pinyinsStr,
      createdAt: data.createdAt,
    };
  },
  toFirestore(sentence) {
    return {
      text: sentence.text,
      pinyinsStr: sentence.pinyinsStr,
      createdAt: sentence.createdAt,
    };
  },
};

const createSentence_in_batch = (
  batch: FirebaseFirestore.WriteBatch,
  sentence: Sentence,
) => {
  batch.set(
    dbAdmin
      .collection("sentences")
      .withConverter(sentenceConverter)
      .doc(sentence.id),
    sentence,
  );
};

const deleteSentence_in_batch = (
  batch: FirebaseFirestore.WriteBatch,
  sentenceId: string,
) => {
  batch.delete(
    dbAdmin
      .collection("sentences")
      .withConverter(sentenceConverter)
      .doc(sentenceId),
  );
};
