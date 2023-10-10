import { Article } from "@/features/article";
import { Hanzi } from "@/features/hanzi";
import { InvertedIndex } from "@/features/invertedIndex";
import { SEARCH_SENTENCES_MAX } from "@/features/invertedIndex/constants";
import { SearchResult } from "@/features/invertedIndex/schema";
import { PinyinFilter, buildPinyin } from "@/features/pinyin";
import { Sentence } from "@/features/sentence";
import { getIntersection } from "@/utils/utils";
import {
  COLLECTIONS,
  DOCUMENTID_COUNT_MAX,
  PROJECT_ID,
  REVALIDATE_TAGS,
} from "./constants";
import {
  BuildStructuredQueryProps,
  StructuredQuery,
  WhereProps,
  WhereValue,
} from "./schema";

function getBaseUrl() {
  // note local build
  const isDev = process.env.NODE_ENV === "development";
  return isDev ? "http://localhost:8080" : "https://firestore.googleapis.com";
}

export const getDocumentURL = (collection: string, docId: string) => {
  return `${getBaseUrl()}/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}/${docId}`;
};

export const getDocumentCount = async (
  collectionId: string,
  tag: string,
): Promise<number> => {
  const res = await fetch(
    FetchRequestURL,
    buildFetchRequestOption({
      collectionId,
      selectFields: [],
      tags: [tag],
    }),
  );
  const json = await res.json();

  if (json.error) {
    console.log(json.error);
    return 0;
  }

  return (json as any[]).filter((item) => item.document).length;
};

// index を通して export するとエラー
export const FetchRequestURL = (() => {
  return `${getBaseUrl()}/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`;
})();

// index を通して export するとエラー
export function buildFetchRequestOption({
  collectionId,
  orderBy,
  selectFields,
  where,
  limit,
  tags,
}: {
  collectionId: string;
  orderBy?: [string, "asc" | "desc"];
  selectFields?: string[];
  where?: WhereProps | WhereProps[];
  limit?: number;
  tags?: string[];
}) {
  const option: { method: string; body: string; next?: { tags: string[] } } = {
    method: "post",
    body: buildFetchRequestOptionBody({
      collectionId,
      orderBy,
      selectFields,
      where,
      limit,
    }),
  };
  if (!!tags) {
    option.next = { tags };
  }
  return option;
}

function buildFetchRequestOptionBody({
  collectionId,
  orderBy,
  selectFields,
  where,
  limit,
}: {
  collectionId: string;
  orderBy?: [string, "asc" | "desc"];
  selectFields?: string[];
  where?: WhereProps | WhereProps[];
  limit?: number;
}) {
  const structuredQuery = buildStructuredQuery({
    collectionId,
    orderBy,
    selectFields,
    where,
    limit,
  });
  return JSON.stringify({ structuredQuery });
}

function buildStructuredQuery({
  collectionId,
  orderBy,
  selectFields,
  where,
  limit,
}: BuildStructuredQueryProps): StructuredQuery {
  const query: StructuredQuery = { from: [{ collectionId }] };

  if (where) {
    // where の先頭が文字なら WhereProps
    if (typeof where[0] === "string") {
      const _where = where as WhereProps;
      query.where = buildWhere(_where);
    }
    // where の先頭が文字でなければ WhereProps[]
    else {
      const wheres = where as WhereProps[];
      const filters = wheres.map((where) => buildWhere(where));
      query.where = {
        compositeFilter: {
          filters,
          op: "AND",
        },
      };
    }
  }

  if (orderBy) {
    query.orderBy = [
      {
        field: {
          fieldPath: orderBy[0],
        },
        direction:
          orderBy[1] === "asc"
            ? "ASCENDING"
            : ("DESCENDING" as "ASCENDING" | "DESCENDING"),
      },
    ];
  }

  if (selectFields) {
    query.select = {
      fields: selectFields.map((field) => ({ fieldPath: field })),
    };
  }

  if (limit) {
    query.limit = limit;
  }
  return query;
}

function buildFieldFilterValue(value: WhereValue):
  | { stringValue: string }
  | { integerValue: string }
  | { booleanValue: boolean }
  | {
      arrayValue: {
        values: ({ stringValue: string } | { referenceValue: string })[];
      };
    }
  | { referenceValue: string } {
  switch (typeof value) {
    case "string":
      if (value.slice(0, 9) === "projects/") {
        return { referenceValue: value };
      }
      return { stringValue: value };
    case "number":
      return { integerValue: String(value) };
    case "boolean":
      return { booleanValue: value };
    case "object":
      return {
        arrayValue: {
          values: value.map((v) => {
            if (v.slice(0, 9) === "projects/") {
              return { referenceValue: v };
            }
            return { stringValue: v };
          }),
        },
      };
    default:
      throw new Error(`where is invalid ${value}`);
  }
}

function buildWhere(where: WhereProps) {
  const value = buildFieldFilterValue(where[2]);
  return {
    fieldFilter: {
      field: {
        fieldPath: where[0],
      },
      op: where[1],
      value,
    },
  };
}

export const getHanzisByForms = async (forms: string[]): Promise<Hanzi[]> => {
  const res = await fetch(
    FetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.hanzis,
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
    .map((item) => buildHanzi(item.document));
};

export const getHanzisByPinyinFilter = async (
  filter: PinyinFilter,
): Promise<Hanzi[]> => {
  const q: BuildStructuredQueryProps = { collectionId: COLLECTIONS.hanzis };
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

  return (json as any[])
    .filter((item) => !!item.document)
    .map((item) => buildHanzi(item.document));
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

// note これは revalidate されない
export const getArticle_deprecated = async (id: string) => {
  const res = await fetch(getDocumentURL(COLLECTIONS.articles, id), {
    next: { tags: [REVALIDATE_TAGS.article] },
  });
  const json = await res.json();
  if (json.error) {
    console.log(json.error);
    return;
  }
  return buildArticle(json);
};

export const getArticlesByIds = async (
  articleIds: string[],
): Promise<Article[]> => {
  if (!articleIds.length) return [];

  const uniq_articleIds = [...new Set(articleIds)];

  if (uniq_articleIds.length > DOCUMENTID_COUNT_MAX) {
    throw new Error("articleIds too big");
  }

  const res = await fetch(
    FetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.articles,

      where: [
        "__name__",
        "IN",
        uniq_articleIds.map(
          (articleId) =>
            `projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTIONS.articles}/${articleId}`,
        ),
      ],
      tags: [REVALIDATE_TAGS.articles], // note タグを分けた方がいい？
    }),
  );
  const json = await res.json();
  if (json.error) {
    throw new Error(json.error);
  }
  return (json as any[])
    .filter((item) => item.document)
    .map((item) => buildArticle(item.document));
};

export const getRecentArticles = async (limit: number): Promise<Article[]> => {
  const res = await fetch(
    FetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.articles,
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

export const getInvertedIndexByForm = async (
  form: string,
): Promise<InvertedIndex | undefined> => {
  const res = await fetch(
    FetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.invertedIndexes,
      where: ["form", "EQUAL", form],
    }),
  );
  const json = await res.json();
  if (json.error) {
    console.log(json.error);
    return;
  }

  const _json = (json as any[]).filter((item) => item.document);

  if (!_json.length) return;

  return buildInvertedIndex(_json[0].document);
};

export const getInvertedIndexesByForms = async (
  forms: string[],
): Promise<InvertedIndex[]> => {
  const res = await fetch(
    FetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.invertedIndexes,
      where: ["form", "IN", forms],
    }),
  );
  const json = await res.json();

  if (!json) return [];

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

export const getSentence = async (
  id: string,
): Promise<Sentence | undefined> => {
  if (!id) return;

  const res = await fetch(getDocumentURL(COLLECTIONS.invertedIndexes, id));
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
      collectionId: COLLECTIONS.invertedIndexes,
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
): Promise<SearchResult> => {
  // 引数がない
  if (!sentenceIds.length) return { total: 0, sentences: [] };

  // 重複削除
  sentenceIds = [...new Set(sentenceIds)];

  if (sentenceIds.length > SEARCH_SENTENCES_MAX) {
    return { total: sentenceIds.length, sentences: [] };
  }

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
        collectionId: COLLECTIONS.sentences,
        where: [
          "__name__",
          "IN",
          subSet.map(
            (sentenceId) =>
              `projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTIONS.sentences}/${sentenceId}`,
          ),
        ],
        tags: [REVALIDATE_TAGS.senences],
      }),
    );
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }

    const sentences = (json as any[])
      .filter((item) => !!item.document)
      .map((item) => buildSentence(item.document));
    result = [...result, ...sentences];
  }

  return { total: result.length, sentences: result };
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

  const { sentences } = await getSentencesByIds(sentenceIds);

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
