import { Sentence } from "@/features/sentence";
import { dbAdmin } from "@/firebase/admin";
import { DOCUMENTID_COUNT_MAX } from "@/firebase/constants";
import { FieldPath, FirestoreDataConverter } from "firebase-admin/firestore";

const COLLECTION = "sentences";

export const getSentencesCount = async () => {
  console.log("get sentences count");
  const snapshot = await dbAdmin.collection(COLLECTION).count().get();
  return snapshot.data().count;
};

export const getSentencesByIds = async (sentenceIds: string[]) => {
  // 引数がない
  if (!sentenceIds.length) return [];

  // 重複削除
  sentenceIds = sentenceIds.filter(
    (item, index, self) => self.indexOf(item) === index,
  );

  let result: Sentence[] = [];

  for (let i = 0; i < sentenceIds.length; i += DOCUMENTID_COUNT_MAX) {
    // DOCUMENTID_COUNT_MAX 毎にクエリを実行
    const subSet = sentenceIds.slice(i, i + DOCUMENTID_COUNT_MAX);
    console.log("get sentences by ids");
    const snapshot = await dbAdmin
      .collection(COLLECTION)
      .withConverter(sentenceConverter)
      .where(FieldPath.documentId(), "in", subSet)
      .get();
    const sentences = snapshot.docs.map((doc) => doc.data());
    result = [...result, ...sentences];
  }
  return result;
};

export const getLatestSentenceByIds = async (sentenceIds: string[]) => {
  // 引数がない
  if (!sentenceIds.length) return undefined;

  // 重複削除
  const sentenceIds_uniq = [...new Set(sentenceIds)];

  let result: Sentence | undefined = undefined;

  for (let i = 0; i < sentenceIds_uniq.length; i += DOCUMENTID_COUNT_MAX) {
    // DOCUMENTID_COUNT_MAX 毎にクエリを実行
    const subSet = sentenceIds_uniq.slice(i, i + DOCUMENTID_COUNT_MAX);
    console.log("get sentences by ids for latest");
    const snapshot = await dbAdmin
      .collection(COLLECTION)
      .withConverter(sentenceConverter)
      .where(FieldPath.documentId(), "in", subSet)
      .get();
    const sentences: Sentence[] = snapshot.docs.map((doc) => doc.data());
    const sentence: Sentence | undefined = sentences.length
      ? sentences.sort((a, b) => b.createdAt - a.createdAt).at(0)
      : undefined;
    if (!!sentence) {
      if (!result) {
        result = sentence;
        continue;
      }
      if (result.createdAt < sentence.createdAt) {
        result = sentence;
      }
    }
  }
  return result;
};

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
