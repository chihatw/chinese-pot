import { REVALIDATE_TAGS } from "@/firebase/constants";
import {
  FetchRequestURL,
  buildFetchRequestOption,
  getDocumentURL,
} from "@/firebase/restapi";
import { Article } from "../schema";

const COLLECTION = "articles";

export const getArticle = async (id: string) => {
  const res = await fetch(getDocumentURL(COLLECTION, id));
  const json = await res.json();
  if (json.error) {
    console.log(json.error);
    return;
  }
  return buildArticle(json);
};

export const getRecentArticles = async (limit: number): Promise<Article[]> => {
  const res = await fetch(
    FetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTION,
      orderBy: ["createdAt", "desc"],
      limit,
      tags: [REVALIDATE_TAGS.articles],
    }),
  );
  const json = await res.json();
  if (json.error) {
    console.log(json.error);
    return [];
  }

  return (json as any[])
    .filter((item) => !!item.document)
    .map((item) => {
      return buildArticle(item.document);
    });
};

const buildArticle = (document: any): Article => {
  const id = document.name.split("/").at(-1) || "";
  const fields = document.fields;
  const sentenceIds: any[] = fields.sentenceIds.arrayValue.values || [];
  return {
    id,
    createdAt: Number(fields.createdAt.integerValue),
    sentenceIds: sentenceIds.map((value) => value.stringValue),
    title: fields.title.stringValue,
  };
};
