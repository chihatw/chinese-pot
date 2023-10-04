import { Sentence } from "@/features/sentence";
import {
  getLatestSentenceByIds,
  getSentencesByIds,
} from "@/features/sentence/services/firebase";
import { dbAdmin } from "@/firebase/admin";
import { getIntersection } from "@/utils/utils";
import { FirestoreDataConverter } from "firebase-admin/firestore";
import { InvertedIndex } from "..";
import { SEARCH_SENTENCES_MAX } from "../constants";
import { SearchResult } from "../schema";

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

// forms の並びで厳選するので、重複ありの forms を受け取る
export const getSentencesByForms = async (
  forms: string,
): Promise<SearchResult> => {
  // 空文字は省く
  forms = forms.trim();

  // 検索項目がなければ、終了
  if (!forms) return { total: 0, sentences: [] };

  // form の１文字ずつ それを含む sentenceIds を抽出する
  const forms_uniq = [...new Set(forms.split(""))];
  const formSentenceIdsRelations =
    await getFormSentenceIdsRelations(forms_uniq);

  // form を含む文が１つもなければ、終了
  if (!Object.keys(formSentenceIdsRelations).length)
    return { total: 0, sentences: [] };

  // forms を位置不問ですべて含む sentence の id を取得
  const sentenceIds = getIntersection(Object.values(formSentenceIdsRelations));
  if (!sentenceIds.length) return { total: 0, sentences: [] };

  // 想定される getSentences が多すぎる場合は、実行しない
  if (sentenceIds.length > SEARCH_SENTENCES_MAX) {
    return { total: sentenceIds.length, sentences: [] };
  }

  const sentences = await getSentencesByIds(sentenceIds);

  // forms の位置が正しいものを厳選
  const filtered = sentences.filter((sentence) =>
    sentence.text.includes(forms),
  );

  return {
    total: filtered.length,
    sentences: filtered,
  };
};

const getFormSentenceIdsRelations = async (forms: string[]) => {
  const result: { [form: string]: string[] } = {};
  for (const form of forms) {
    const sentenceIds = await getSentenceIdsByForm(form);
    if (sentenceIds) {
      result[form] = sentenceIds;
    }
  }
  return result;
};

const getSentenceIdsByForm = async (form: string) => {
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(invertedIndexConverter)
    .where("form", "==", form)
    .get();
  return snapshot.docs.at(0)?.data().sentenceIds;
};

export const getLastSentenceByForms = async (forms_uniq: string[]) => {
  const formSentenceIdsRelations =
    await getFormSentenceIdsRelations(forms_uniq);

  const result: { [form: string]: Sentence } = {};
  for (const form of Object.keys(formSentenceIdsRelations)) {
    const sentenceIds = formSentenceIdsRelations[form];
    const sentence = await getLatestSentenceByIds(sentenceIds);
    if (!!sentence) {
      result[form] = sentence;
    }
  }
  return result;
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
