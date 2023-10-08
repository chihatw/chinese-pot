import { PinyinFilter, buildPinyin } from "@/features/pinyin";

import { BuildStructuredQueryProps, WhereProps } from "@/firebase";
import { FetchRequestURL, buildFetchRequestOption } from "@/firebase/restapi";
import { Hanzi } from "../schema";

const COLLECTION = "hanzis";

export const getHanzisCount = async (): Promise<number> => {
  const res = await fetch(
    FetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTION,
      selectFields: [],
    }),
  );
  const json = await res.json();
  if (json.error) {
    console.log(json.error);
    return 0;
  }

  return json.length;
};

export const getHanzisByForms = async (forms: string[]): Promise<Hanzi[]> => {
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

  return (json as any[]).map((item) => buildHanzi(item.document));
};

export const getHanzisByPinyinFilter = async (
  filter: PinyinFilter,
): Promise<Hanzi[]> => {
  const q: BuildStructuredQueryProps = { collectionId: COLLECTION };
  const where: WhereProps[] = [];

  if (filter.consonants.length) {
    where.push(["consonant", "IN", filter.consonants]);
  }

  if (filter.vowels.length) {
    where.push(["vowel", "IN", filter.vowels]);
  }

  if (filter.tone) {
    where.push(["tone", "EQUAL", filter.tone]);
  }

  q.where = where;

  const res = await fetch(FetchRequestURL, buildFetchRequestOption(q));

  const json = await res.json();
  if (json.error) {
    console.log(json.error);
    return [];
  }

  return (json as any[]).map((item) => buildHanzi(item.document));
};

const buildHanzi = (document: any): Hanzi => {
  const fields = document.fields;
  const pinyinStr =
    fields.consonant.stringValue +
    fields.vowel.stringValue +
    fields.tone.stringValue;
  return {
    id: document.name.split("/").at(-1) || "",
    form: fields.form.stringValue || "",
    pinyin: buildPinyin(pinyinStr || ""),
    count: Number(fields.count.integerValue),
    latestSentenceId: fields.latestSentenceId.stringValue,
  };
};
