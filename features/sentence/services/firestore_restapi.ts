import { getInvertedIndexByForm } from "@/features/invertedIndex";
import { SEARCH_SENTENCES_MAX } from "@/features/invertedIndex/constants";
import { SearchResult } from "@/features/invertedIndex/schema";
import {
  DOCUMENTID_COUNT_MAX,
  PROJECT_ID,
  REVALIDATE_TAGS,
} from "@/firebase/constants";
import {
  FetchRequestURL,
  buildFetchRequestOption,
  getDocumentURL,
} from "@/firebase/restapi";
import { getIntersection } from "@/utils/utils";
import { Sentence } from "../schema";

const COLLECTION = "sentences";

export const getSentence = async (
  id: string,
): Promise<Sentence | undefined> => {
  if (!id) return;

  const res = await fetch(getDocumentURL(COLLECTION, id));
  const json = await res.json();
  if (json.error) {
    console.log(json.error);
    return;
  }
  return buildSentence(json);
};

export const getRecentSentences = async (
  limit: number,
): Promise<Sentence[]> => {
  const res = await fetch(
    FetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTION,
      orderBy: ["createdAt", "desc"],
      limit,
      tags: [REVALIDATE_TAGS.senences],
    }),
  );

  const json = await res.json();
  if (json.error) {
    console.log(json.error);
    return [];
  }

  return (json as any[])
    .filter((item) => !!item.document)
    .map((item) => buildSentence(item.document));
};

export const getSentencesByIds = async (
  sentenceIds: string[],
): Promise<Sentence[]> => {
  // 引数がない
  if (!sentenceIds.length) return [];

  // 重複削除
  sentenceIds = [...new Set(sentenceIds)];

  let result: Sentence[] = [];

  for (let i = 0; i < sentenceIds.length; i += DOCUMENTID_COUNT_MAX) {
    // DOCUMENTID_COUNT_MAX 毎にクエリを実行
    const subSet = sentenceIds
      .slice(i, i + DOCUMENTID_COUNT_MAX)
      .filter(Boolean);
    if (!subSet.length) continue;

    const res = await fetch(
      FetchRequestURL,
      buildFetchRequestOption({
        collectionId: COLLECTION,
        where: [
          "__name__",
          "IN",
          subSet.map(
            (sentenceId) =>
              `projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION}/${sentenceId}`,
          ),
        ],
        tags: [REVALIDATE_TAGS.senences],
      }),
    );
    const json = await res.json();

    const sentences = (json as any[])
      .filter((item) => !!item.document)
      .map((item) => buildSentence(item.document));
    result = [...result, ...sentences];
  }

  return result;
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

const buildSentence = (document: any): Sentence => {
  const id = document.name.split("/").at(-1) || "";
  const fields = document.fields;
  return {
    id,
    text: fields.text.stringValue,
    pinyinsStr: fields.pinyinsStr.stringValue,
    createdAt: Number(fields.createdAt.integerValue),
  };
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
