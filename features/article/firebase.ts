import { dbAdmin } from "@/firebase/admin";
import { COLLECTIONS } from "@/firebase/constants";
import { FirestoreDataConverter } from "firebase-admin/firestore";
import { Article } from "./schema";

const COLLECTION = COLLECTIONS.articles;

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
