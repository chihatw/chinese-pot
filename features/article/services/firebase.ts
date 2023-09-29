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

export const batchAddArticles = async (articles: Article[]) => {
  console.log("batch add articles");
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
