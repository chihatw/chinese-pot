import { Sentence } from "@/features/sentence";
import { dbAdmin } from "@/firebase/admin";
import { FieldPath, FirestoreDataConverter } from "firebase-admin/firestore";

const COLLECTION = "sentences";

export const getSentencesCount = async () => {
  console.log("get sentences count");
  const snapshot = await dbAdmin.collection(COLLECTION).count().get();
  return snapshot.data().count;
};

export const getSentencesByIds = async (sentenceIds: string[]) => {
  console.log("get sentences by ids");
  if (!sentenceIds.length) return [];
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(sentenceConverter)
    .where(FieldPath.documentId(), "in", sentenceIds)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

export const batchAddSentences = async (sentences: Sentence[]) => {
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
  console.log("batch add sentences");
  await batch.commit();
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
