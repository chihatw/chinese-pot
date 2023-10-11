import { Article } from "@/features/article";
import { Hanzi } from "@/features/hanzi";
import { InvertedIndex } from "@/features/invertedIndex";
import { Pinyin } from "@/features/pinyin";
import { Sentence } from "@/features/sentence";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import {
  FieldValue,
  FirestoreDataConverter,
  getFirestore,
} from "firebase-admin/firestore";
import { nanoid } from "nanoid";
import { COLLECTIONS } from "./constants";

const serviceAccount = JSON.parse(
  process.env.NEXT_FIREBASE_SERVICE_ACCOUNT_KEY as string,
);

!getApps()[0] &&
  initializeApp({
    credential: cert(serviceAccount),
  });

export const authAdnimSDK = getAuth();
export const dbAdmin = getFirestore();

export const batchAddHanzis = async (hanzis: Hanzi[]) => {
  const batch = dbAdmin.batch();
  for (const hanzi of hanzis) {
    batch.set(
      dbAdmin
        .collection(COLLECTIONS.hanzis)
        .withConverter(hanziConverter)
        .doc(hanzi.id),
      hanzi,
    );
  }
  await batch.commit();
};

export const batchAddArticles = async (articles: Article[]) => {
  const batch = dbAdmin.batch();
  for (const article of articles) {
    batch.set(
      dbAdmin
        .collection(COLLECTIONS.articles)
        .withConverter(articleConverter)
        .doc(article.id),
      article,
    );
  }
  await batch.commit();
};

export const batchAddSentences = async (sentences: Sentence[]) => {
  console.log("batch add sentences");
  const batch = dbAdmin.batch();
  for (const sentence of sentences) {
    batch.set(
      dbAdmin
        .collection(COLLECTIONS.sentences)
        .withConverter(sentenceConverter)
        .doc(sentence.id),
      sentence,
    );
  }
  await batch.commit();
};

export const batchAddInvertedIndexes = async (
  invertedIndexes: InvertedIndex[],
) => {
  const batch = dbAdmin.batch();
  for (const invertedIndex of invertedIndexes) {
    batch.set(
      dbAdmin
        .collection(COLLECTIONS.invertedIndexes)
        .withConverter(invertedIndexConverter)
        .doc(invertedIndex.id),
      invertedIndex,
    );
  }
  batch.commit();
};

export const addHanzi = async (hanzi: Hanzi) => {
  await dbAdmin
    .collection(COLLECTIONS.hanzis)
    .withConverter(hanziConverter)
    .doc(hanzi.id)
    .set(hanzi);
};

export const addArticle = async (article: Article) => {
  await dbAdmin
    .collection(COLLECTIONS.articles)
    .withConverter(articleConverter)
    .doc(article.id)
    .set(article);
};

export const updateArticle = async (
  id: string,
  title: string,
  createdAt: number,
) => {
  await dbAdmin
    .collection(COLLECTIONS.articles)
    .withConverter(articleConverter)
    .doc(id)
    .update({ title, createdAt });
};

export const deleteArticle = async (id: string) => {
  await dbAdmin.collection(COLLECTIONS.articles).doc(id).delete();
};

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

export const deleteSentence = async (
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

// noto 読み込みレコード削減のため admin を使って、 restapi は使わない
export const getDocumentCount = async (collection: string) => {
  const snapshot = await dbAdmin.collection(collection).count().get();
  return snapshot.data().count;
};

const getInvertedIndexesByForms = async (
  forms: string[],
): Promise<InvertedIndex[]> => {
  const snapshot = await dbAdmin
    .collection(COLLECTIONS.invertedIndexes)
    .withConverter(invertedIndexConverter)
    .where("form", "in", forms)
    .get();

  return snapshot.docs.map((doc) => doc.data());
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

const updateHanzi_in_batch = (
  batch: FirebaseFirestore.WriteBatch,
  hanzi: Hanzi,
) => {
  // note converter が機能せず、id や pinyin がそのまま 登録されるので、手動で変換
  batch.update(dbAdmin.collection(COLLECTIONS.hanzis).doc(hanzi.id), {
    consonant: hanzi.pinyin.consonant,
    count: hanzi.count,
    form: hanzi.form,
    latestSentenceId: hanzi.latestSentenceId,
    tone: hanzi.pinyin.tone,
    vowel: hanzi.pinyin.vowel,
  });
};

const decrementHanziCount_in_batch = (
  batch: FirebaseFirestore.WriteBatch,
  hanziId: string,
) => {
  batch.update(
    dbAdmin
      .collection(COLLECTIONS.hanzis)
      .withConverter(hanziConverter)
      .doc(hanziId),
    {
      count: FieldValue.increment(-1),
      latestSentenceId: "",
    },
  );
};

const createInvertedIndex_in_batch = (
  batch: FirebaseFirestore.WriteBatch,
  form: string,
  sentenceId: string,
) => {
  const id = nanoid(8);
  batch.set(
    dbAdmin
      .collection(COLLECTIONS.invertedIndexes)
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

const incrementInvertedIndexCount_in_batch = (
  batch: FirebaseFirestore.WriteBatch,
  invertedIndexId: string,
  sentenceId: string,
) => {
  batch.update(
    dbAdmin
      .collection(COLLECTIONS.invertedIndexes)
      .withConverter(invertedIndexConverter)
      .doc(invertedIndexId),
    {
      count: FieldValue.increment(1),
      sentenceIds: FieldValue.arrayUnion(sentenceId),
    },
  );
};

const decrementInvertedIndexCount_in_batch = (
  batch: FirebaseFirestore.WriteBatch,
  invertedIndexId: string,
  sentenceId: string,
) => {
  batch.update(
    dbAdmin
      .collection(COLLECTIONS.invertedIndexes)
      .withConverter(invertedIndexConverter)
      .doc(invertedIndexId),
    {
      count: FieldValue.increment(-1),
      sentenceIds: FieldValue.arrayRemove(sentenceId),
    },
  );
};

const hanziConverter: FirestoreDataConverter<Hanzi> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      form: data.form,
      pinyin: {
        tone: data.tone,
        vowel: data.vowel,
        consonant: data.consonant,
      },
      count: data.count,
      latestSentenceId: data.latestSentenceId,
    };
  },
  toFirestore(hanzi) {
    const pinyin = hanzi.pinyin as Pinyin;

    return {
      form: hanzi.form,
      tone: pinyin.tone,
      vowel: pinyin.vowel,
      consonant: pinyin.consonant,
      count: hanzi.count,
      latestSentenceId: hanzi.latestSentenceId,
    };
  },
};

const articleConverter: FirestoreDataConverter<Article> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: data.title,
      createdAt: data.createdAt,
      sentenceIds: data.sentenceIds,
    };
  },
  toFirestore(article) {
    return {
      title: article.title,
      createdAt: article.createdAt,
      sentenceIds: article.sentenceIds,
    };
  },
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
