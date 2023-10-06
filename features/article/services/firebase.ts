import { dbAdmin } from "@/firebase/admin";
import { FirestoreDataConverter } from "firebase-admin/firestore";
import { Article } from "..";

const COLLECTION = "articles";

export const getArticleCount = async () => {
  console.log("get article count");
  const snapshot = await dbAdmin.collection(COLLECTION).count().get();
  return snapshot.data().count;
};

export const getArticle = async (articleId: string) => {
  console.log("get article");
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(articleConverter)
    .doc(articleId)
    .get();
  return snapshot.data();
};

export const getRecentArticles = async (limit: number) => {
  console.log("get recent articles");
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(articleConverter)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

export const batchAddArticles = async (articles: Article[]) => {
  const batch = dbAdmin.batch();
  for (const article of articles) {
    batch.set(
      dbAdmin
        .collection(COLLECTION)
        .withConverter(articleConverter)
        .doc(article.id),
      article,
    );
  }
  await batch.commit();
};

export const addArticle = async (article: Article) => {
  await dbAdmin
    .collection(COLLECTION)
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
    .collection(COLLECTION)
    .withConverter(articleConverter)
    .doc(id)
    .update({ title, createdAt });
};

export const deleteArticle = async (id: string) => {
  await dbAdmin.collection(COLLECTION).doc(id).delete();
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
