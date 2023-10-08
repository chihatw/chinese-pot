import { FetchRequestURL, buildFetchRequestOption } from "@/firebase/restapi";
import { InvertedIndex } from "../schema";

const COLLECTION = "invertedIndexes";

export const getInvertedIndexesCount = async () => {
  const res = await fetch(
    FetchRequestURL,
    buildFetchRequestOption({ collectionId: COLLECTION, selectFields: [] }),
  );
  const json = await res.json();
  if (json.error) {
    console.log(json.error);
    return 0;
  }
  return json.length;
};

export const getInvertedIndexByForm = async (
  form: string,
): Promise<InvertedIndex | undefined> => {
  const res = await fetch(
    FetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTION,
      where: ["form", "EQUAL", form],
    }),
  );
  const json = await res.json();
  if (json.error) {
    console.log(json.error);
    return;
  }

  if (!(json as any[]).length) return;

  return buildInvertedIndex((json as any[])[0].document);
};

export const getInvertedIndexesByForms = async (
  forms: string[],
): Promise<InvertedIndex[]> => {
  const res = await fetch(
    FetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTION,
      where: ["form", "IN", forms],
    }),
  );
  const json = await res.json();
  if (json.error) {
    console.log(json.error);
    return [];
  }

  return (json as any[])
    .filter((item) => !!item.document)
    .map((item) => buildInvertedIndex(item.document));
};

const buildInvertedIndex = (document: any): InvertedIndex => {
  const id = document.name.split("/").at(-1) || "";
  const fields = document.fields;
  const sentenceIds: any[] =
    document.fields.sentenceIds.arrayValue.values || [];
  return {
    id,
    form: fields.form.stringValue,
    count: Number(fields.count.integerValue),
    sentenceIds: sentenceIds.map((item) => item.stringValue),
  };
};
