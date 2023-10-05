import { Hanzi } from "@/features/hanzi";
import { hanziConverter } from "@/features/hanzi/services/firebase";
import { SEARCH_SENTENCES_MAX } from "@/features/invertedIndex/constants";
import { SearchResult } from "@/features/invertedIndex/schema";
import {
  getInvertedIndexByForm,
  getInvertedIndexesByForms,
  invertedIndexConverter,
} from "@/features/invertedIndex/services/firebase";
import { Sentence } from "@/features/sentence";
import { dbAdmin } from "@/firebase/admin";
import { DOCUMENTID_COUNT_MAX } from "@/firebase/constants";
import { getIntersection } from "@/utils/utils";
import {
  FieldPath,
  FieldValue,
  FirestoreDataConverter,
} from "firebase-admin/firestore";
import { nanoid } from "nanoid";

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
  sentenceIds = [...new Set(sentenceIds)];

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

// todo
export const addSentence = async (sentence: Sentence, hanzis: Hanzi[]) => {
  // invertedIndexes
  const forms = [...new Set(sentence.text.split(""))];
  const invertedIndexes = await getInvertedIndexesByForms(forms);

  const batch = dbAdmin.batch();

  for (const form of forms) {
    const invertedIndex = invertedIndexes.find((i) => i.form === form);
    if (!invertedIndex) {
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
          sentenceIds: [sentence.id],
        },
      );
    } else {
      batch.update(
        dbAdmin
          .collection("invertedIndexes")
          .withConverter(invertedIndexConverter)
          .doc(invertedIndex.id),
        {
          count: FieldValue.increment(1),
          sentenceIds: FieldValue.arrayUnion(sentence.id),
        },
      );
    }
  }

  for (const hanzi of hanzis) {
    batch.update(
      dbAdmin.collection("hanzis").withConverter(hanziConverter).doc(hanzi.id),
      hanzi,
    );
  }
  // todo sentence
  batch.set(
    dbAdmin
      .collection("sentences")
      .withConverter(sentenceConverter)
      .doc(sentence.id),
    sentence,
  );
  batch.commit();
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

const getFormSentenceIdsRelations = async (forms: string[]) => {
  const result: { [form: string]: string[] } = {};
  for (const form of forms) {
    const invertedIndex = await getInvertedIndexByForm(form);
    if (invertedIndex && invertedIndex.sentenceIds.length) {
      result[form] = invertedIndex.sentenceIds;
    }
  }
  return result;
};
