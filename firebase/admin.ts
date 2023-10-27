import { Article } from "@/features/article";
import { Hanzi } from "@/features/hanzi";
import { InvertedIndex } from "@/features/invertedIndex";
import { Pinyin } from "@/features/pinyin";
import { Sentence, buildHanziIds_from_Sentence } from "@/features/sentence";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import {
  FieldValue,
  FirestoreDataConverter,
  initializeFirestore,
} from "firebase-admin/firestore";
import { nanoid } from "nanoid";
import { COLLECTIONS } from "./constants";

if (typeof global.readCount !== "number") {
  global.readCount = 0;
}

const serviceAccount = JSON.parse(
  process.env.NEXT_FIREBASE_SERVICE_ACCOUNT_KEY as string,
);

// https://zenn.dev/mktu/articles/55b3bfee839cfc
const app = !getApps()[0]
  ? initializeApp({ credential: cert(serviceAccount) })
  : getApps()[0];

export const authAdmin = getAuth();

// https://firebase.google.com/docs/reference/admin/node/firebase-admin.firestore.firestoresettings.md#firestoresettings_interface
const dbAdmin = initializeFirestore(app, { preferRest: true });

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
  const invertedIndexes = await _getInvertedIndexesByForms(forms);

  const batch = dbAdmin.batch();

  for (const form of forms) {
    const invertedIndex = invertedIndexes.find((i) => i.form === form);
    if (!invertedIndex) {
      const newInvertedIndex: InvertedIndex = {
        id: nanoid(8),
        form,
        count: 1,
        sentenceIds: [sentence.id],
      };
      createInvertedIndex_in_batch(batch, newInvertedIndex);
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
    addSentenceIdToArticle_in_batch(batch, articleId, sentence.id);
  }

  batch.commit();
};

export const deleteSentence = async (
  sentence: Sentence,
  articleId?: string,
) => {
  /**
   * invertedIndex の更新
   */
  const forms = [...new Set(sentence.text.split(""))];
  const invertedIndexes = await _getInvertedIndexesByForms(forms);
  const batch = dbAdmin.batch();
  for (const form of forms) {
    const invertedIndex = invertedIndexes.find((i) => i.form === form);
    if (!invertedIndex) throw new Error("invertedIndex cannot find");
    // sentenceId の削除と、カウントを１つ減らす
    decrementInvertedIndexCount_in_batch(batch, invertedIndex.id, sentence.id);
  }

  /**
   * hanzi の更新
   */
  const hanziIds = buildHanziIds_from_Sentence(sentence);
  for (const hanziId of hanziIds) {
    // latestSentenceId の削除と、カウントを１つ減らす
    decrementHanziCount_in_batch(batch, hanziId);
  }

  /**
   * sentence の削除
   */
  deleteSentence_in_batch(batch, sentence.id);

  if (!!articleId) {
    /**
     * article の更新
     */
    // sentenceIds　からの削除
    removeSentenceIdFromArticle_in_batch(batch, articleId, sentence.id);
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
  global.readCount++;
  console.log("getDocumentCount", 1, "readCount: ", global.readCount);
  return snapshot.data().count;
};

const _getInvertedIndexesByForms = async (
  forms: string[],
): Promise<InvertedIndex[]> => {
  const snapshot = await dbAdmin
    .collection(COLLECTIONS.invertedIndexes)
    .withConverter(invertedIndexConverter)
    .where("form", "in", forms)
    .get();
  global.readCount += snapshot.size;
  console.log(
    "_getInvertedIndexesByForms",
    snapshot.size,
    "readCount: ",
    global.readCount,
  );
  return snapshot.docs.map((doc) => doc.data());
};

const addSentenceIdToArticle_in_batch = (
  batch: FirebaseFirestore.WriteBatch,
  articleId: string,
  sentenceId: string,
) => {
  batch.update(dbAdmin.collection(COLLECTIONS.articles).doc(articleId), {
    sentenceIds: FieldValue.arrayUnion(sentenceId),
  });
};

const removeSentenceIdFromArticle_in_batch = (
  batch: FirebaseFirestore.WriteBatch,
  articleId: string,
  sentenceId: string,
) => {
  batch.update(dbAdmin.collection(COLLECTIONS.articles).doc(articleId), {
    sentenceIds: FieldValue.arrayRemove(sentenceId),
  });
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
  invertedIndex: InvertedIndex,
) => {
  batch.set(
    dbAdmin
      .collection(COLLECTIONS.invertedIndexes)
      .withConverter(invertedIndexConverter)
      .doc(invertedIndex.id),
    invertedIndex,
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
