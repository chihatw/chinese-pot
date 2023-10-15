import { Article } from "@/features/article";
import { Hanzi } from "@/features/hanzi";
import { InvertedIndex } from "@/features/invertedIndex";

import { SearchResult } from "@/features/invertedIndex/schema";
import { PinyinFilter, buildPinyin } from "@/features/pinyin";
import { Sentence } from "@/features/sentence";
import { buildFetchRequestOption } from "@/utils/buildFetchRequestOption";
import { getIntersection } from "@/utils/utils";
import {
  COLLECTIONS,
  REVALIDATE_TAGS,
  SEARCH_ARTICLES_BY_SENTENCEIDS_MAX,
  SEARCH_SENTENCES_MAX,
} from "./constants";
import { BuildStructuredQueryProps, WhereProps } from "./schema";

// note restapi の in の条件は 10項まで
const IN_ARRAY_MAX = 10;

export const PROJECT_ID = "chinese-pot";

const PROJECT_PATH = `projects/${PROJECT_ID}/databases/(default)/documents`;

const getBaseUrl = () => {
  const isDev = process.env.NODE_ENV === "development";

  // note pnpm build のときは isDev が false 、つまり本番環境から fetch される
  // pnpm build の書き込み先の default は　local なので、書き込み先と読み込み先の統一が必要
  const pathname = isDev
    ? "http://localhost:8080"
    : "https://firestore.googleapis.com";
  return `${pathname}/v1/${PROJECT_PATH}`;
};

// note structuredQuery を使わずに取得すると、 revalidate されない
export const getDocumentURL_declare = (collection: string, docId: string) =>
  `${getBaseUrl()}/${collection}/${docId}`;

const fetchRequestURL = `${getBaseUrl()}:runQuery`;

export const getHanzisByForms = async (forms: string[]): Promise<Hanzi[]> => {
  const res = await fetch(
    fetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.hanzis,
      where: ["form", "IN", forms],
      tags: [REVALIDATE_TAGS.hanzisByForms],
    }),
  );

  const { docs } = await getDocs(res);
  console.log("getHanzisByForms", docs.length);
  return docs.map((doc) => buildHanzi(doc));
};

export const getHanzisByPinyinFilter = async (
  filter: PinyinFilter,
): Promise<Hanzi[]> => {
  const q: BuildStructuredQueryProps = { collectionId: COLLECTIONS.hanzis };
  const where: WhereProps[] = [];
  // note getHanzisByPinyinFilter のレコード読み取りが多いので、子音、母音、トーンの２つ以上が指定されるまで検索しない
  let point = 0;
  if (filter.consonants.length) {
    point++;
  }
  if (filter.vowels.length) {
    point++;
  }
  if (filter.tone.length) {
    point++;
  }
  if (point < 2) return [];

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

  const res = await fetch(fetchRequestURL, buildFetchRequestOption(q));
  const { docs } = await getDocs(res);
  console.log("getHanzisByPinyinFilter", docs.length);
  return docs.map((doc) => buildHanzi(doc));
};

export const getArticlesByIds = async (
  articleIds: string[],
): Promise<{ articles: Article[]; readTime: number }> => {
  if (!articleIds.length) return { articles: [], readTime: 0 };

  const uniq_articleIds = [...new Set(articleIds)];

  if (uniq_articleIds.length > IN_ARRAY_MAX) {
    throw new Error(`articleIds bigger than ${IN_ARRAY_MAX}`);
  }

  const res = await fetch(
    fetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.articles,
      where: [
        "__name__",
        "IN",
        uniq_articleIds.map(
          (articleId) => `${PROJECT_PATH}/${COLLECTIONS.articles}/${articleId}`,
        ),
      ],
      tags: [REVALIDATE_TAGS.articles], // note タグを分けた方がいい？
    }),
  );
  const { docs, readTime } = await getDocs(res);
  const articles = docs.map((doc) => buildArticle(doc));
  return { articles, readTime };
};

export const getRecentArticles = async (
  limit: number,
): Promise<{ articles: Article[]; readTime: number }> => {
  const res = await fetch(
    fetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.articles,
      orderBy: ["createdAt", "desc"],
      limit,
      tags: [REVALIDATE_TAGS.articles],
      cache: "no-store",
    }),
  );
  const { docs, readTime } = await getDocs(res);
  console.log("getRecentArticles", docs.length);
  const articles = docs.map((doc) => buildArticle(doc));
  return { articles, readTime };
};

export const getArticlesBySentenceIds = async (sentenceIds: string[]) => {
  const articles: Article[] = [];
  if (sentenceIds.length <= SEARCH_ARTICLES_BY_SENTENCEIDS_MAX) {
    for (const sentenceId of sentenceIds) {
      if (_checkArticlesAlreadyHasSentence(articles, sentenceId)) continue;
      const article = await getArticleBySentenceId(sentenceId);
      if (!article) continue;

      articles.push(article);
    }
  }
  return articles;
};

export const getArticleBySentenceId = async (
  sentenceId: string,
): Promise<Article | undefined> => {
  if (!sentenceId) return;

  const res = await fetch(
    fetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.articles,
      where: ["sentenceIds", "ARRAY_CONTAINS", sentenceId],
    }),
  );
  const { docs } = await getDocs(res);
  const articles = docs.map((doc) => buildArticle(doc));
  console.log("getArticleBySentenceId", docs.length);
  return articles.at(0);
};

// form で　１つずつ　sentenceIds を取得して、 すべての form で取得された共通の sentenceIds を抽出する
// byForms の方が効率が良い？
export const _getInvertedIndexByForm = async (
  form: string,
): Promise<InvertedIndex | undefined> => {
  const res = await fetch(
    fetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.invertedIndexes,
      where: ["form", "EQUAL", form],
      tags: [REVALIDATE_TAGS.invertedIndexByForm], // sentence を変更した時は、これを update しないと、 seartch に反映されない
    }),
  );
  const { docs } = await getDocs(res);
  const results = docs.map((doc) => buildInvertedIndex(doc));
  console.log("_getInvertedIndexByForm", docs.length);
  return results.at(0);
};

export const getRecentSentences = async (
  limit: number,
): Promise<Sentence[]> => {
  const res = await fetch(
    fetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.sentences,
      orderBy: ["createdAt", "desc"],
      limit,
      tags: [REVALIDATE_TAGS.senences],
    }),
  );

  const { docs } = await getDocs(res);
  console.log("getRecentSentences", docs.length);
  return docs.map((doc) => buildSentence(doc));
};

// note fetch する sentences の上限を SEARCH_SENTENCES_MAX で指定

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

  for (let i = 0; i < sentenceIds.length; i += IN_ARRAY_MAX) {
    // IN_ARRAY_MAX 毎にクエリを実行
    const subSet = sentenceIds.slice(i, i + IN_ARRAY_MAX).filter(Boolean);
    if (!subSet.length) continue;

    const res = await fetch(
      fetchRequestURL,
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
    const { docs } = await getDocs(res);
    console.log("getSentencesByIds", docs.length);
    const sentences = docs.map((doc) => buildSentence(doc));
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

  const formSentenceIdsRelations: { [form: string]: string[] } = {};
  for (const form of forms_uniq) {
    const invertedIndex = await _getInvertedIndexByForm(form);
    if (invertedIndex && invertedIndex.sentenceIds.length) {
      formSentenceIdsRelations[form] = invertedIndex.sentenceIds;
    }
  }

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

const getDocs = async (res: Response) => {
  // https://developer.mozilla.org/ja/docs/Web/API/Response
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json();

  const docs = (json as any[])
    .filter((item) => !!item.document)
    .map((item) => item.document);

  const readTime = (json as any[]).at(0)?.readTime || 0;

  return { docs, readTime };
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
const _checkArticlesAlreadyHasSentence = (
  articles: Article[],
  sentenceId: string,
) => {
  let alreadyHas = false;
  for (const article of articles) {
    if (article.sentenceIds.includes(sentenceId)) {
      alreadyHas = true;
      break;
    }
  }
  return alreadyHas;
};
