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
  IN_ARRAY_MAX,
  REVALIDATE_TAGS,
  SEARCH_ARTICLES_BY_SENTENCEIDS_MAX,
  SEARCH_SENTENCES_MAX,
  SENTENCE_TEXT_MAX,
} from "./constants";
import { BuildStructuredQueryProps, WhereProps } from "./schema";

// note restapi の in の条件は 30項まで

const PROJECT_ID = "chinese-pot";
const PROJECT_PATH = `projects/${PROJECT_ID}/databases/(default)/documents`;

export const getBaseUrl = () => {
  const isDev = process.env.NODE_ENV === "development";

  // note pnpm build のときは isDev が false 、つまり本番環境から fetch される
  // pnpm build の書き込み先の default は　local なので、書き込み先と読み込み先の統一が必要
  const pathname = isDev
    ? "http://localhost:8080"
    : "https://firestore.googleapis.com";
  return `${pathname}/v1/${PROJECT_PATH}`;
};

// note structuredQuery を使わずに取得すると、 revalidate されない
export const documentURL_declare = (collection: string, docId: string) =>
  `${getBaseUrl()}/${collection}/${docId}`;

export const getArticle_declare = async (articleId: string) => {
  const res = await fetch(
    documentURL_declare(COLLECTIONS.articles, articleId),
    { next: { tags: [REVALIDATE_TAGS.article] } },
  );
  const json = await res.json();
  console.log(json);
  // return
};

const fetchRequestURL = `${getBaseUrl()}:runQuery`;

/**
 *
 * SentenceForm で searchParams から form（字形） を取得
 *
 * 取得した　form を持つ　Hanzi を抽出
 */
export const getHanzisByForms = async (
  forms: string[],
): Promise<{ hanzis: Hanzi[] }> => {
  // 引数がない
  if (!forms.length) return { hanzis: [] };

  // 重複削除
  const uniq_forms = [...new Set(forms)];

  if (uniq_forms.length > SENTENCE_TEXT_MAX) {
    console.error(`more than ${SENTENCE_TEXT_MAX}`);
    return { hanzis: [] };
  }

  let result: Hanzi[] = [];

  for (let i = 0; i < uniq_forms.length; i += IN_ARRAY_MAX) {
    // IN_ARRAY_MAX 毎にクエリを実行
    const subSet = uniq_forms.slice(i, i + IN_ARRAY_MAX).filter(Boolean);
    if (!subSet.length) continue;

    const res = await fetch(
      fetchRequestURL,
      buildFetchRequestOption({
        collectionId: COLLECTIONS.hanzis,
        where: ["form", "IN", subSet],
        tags: [REVALIDATE_TAGS.sentenceForm],
      }),
    );

    const { docs, readCount } = await getDocs(res);
    global.readCount += readCount;
    console.log(
      "getHanzisByForms",
      docs.length,
      `readCount: `,
      global.readCount,
    );
    const hanzis = docs.map((doc) => buildHanzi(doc));
    result = [...result, ...hanzis];
  }

  return { hanzis: result };
};

// note おそらく、1回当たりの読み込み件数はこれが一番多い
// 読み込み件数を減らす方法は、filter を key, hanzis を value にもつ collection　を作ること
// 例) key: 'ji', value: [{ id: '..', form: '..', pinyin: {...} }, {...}, ...]
export const getHanzisByPinyinFilter = async (
  filter: PinyinFilter,
): Promise<{ hanzis: Hanzi[] }> => {
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

  const res = await fetch(fetchRequestURL, buildFetchRequestOption(q));
  const { docs, readCount } = await getDocs(res);
  global.readCount += readCount;
  console.log(
    "getHanzisByPinyinFilter",
    docs.length,
    `readCount:`,
    global.readCount,
  );
  const hanzis = docs.map((doc) => buildHanzi(doc));
  return { hanzis };
};

export const getArticlesByIds = async (
  articleIds: string[],
): Promise<{ articles: Article[]; readTime: number }> => {
  // 引数がない
  if (!articleIds.length) return { articles: [], readTime: 0 };

  // 重複削除
  const uniq_articleIds = [...new Set(articleIds)];

  if (uniq_articleIds.length > SENTENCE_TEXT_MAX) {
    console.error(`more than ${SENTENCE_TEXT_MAX}`);
    return { articles: [], readTime: 0 };
  }

  let result: Article[] = [];
  let readTime = 0;

  for (let i = 0; i < uniq_articleIds.length; i += IN_ARRAY_MAX) {
    const subSet = uniq_articleIds.slice(i, i + IN_ARRAY_MAX).filter(Boolean);
    if (!subSet.length) continue;
    const res = await fetch(
      fetchRequestURL,
      buildFetchRequestOption({
        collectionId: COLLECTIONS.articles,
        where: [
          "__name__",
          "IN",
          subSet.map(
            (articleId) =>
              `${PROJECT_PATH}/${COLLECTIONS.articles}/${articleId}`,
          ),
        ],
        tags: [REVALIDATE_TAGS.articles], // note タグを分けた方がいい？
      }),
    );
    const { docs, readTime: _readTime, readCount } = await getDocs(res);
    global.readCount += readCount;
    console.log(
      "getArticlesByIds",
      docs.length,
      `readCount: `,
      global.readCount,
    );
    const articles = docs.map((doc) => buildArticle(doc));
    result = [...result, ...articles];
    readTime = _readTime;
  }
  return { articles: result, readTime };
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
    }),
  );
  const { docs, readTime, readCount } = await getDocs(res);
  global.readCount += readCount;
  console.log(
    "getRecentArticles",
    docs.length,
    `readCount: `,
    global.readCount,
  );

  const articles = docs.map((doc) => buildArticle(doc));
  return { articles, readTime };
};

export const getArticlesBySentenceIds = async (
  sentenceIds: string[],
): Promise<{ articles: Article[] }> => {
  const articles: Article[] = [];
  let readCount = 0;
  if (sentenceIds.length <= SEARCH_ARTICLES_BY_SENTENCEIDS_MAX) {
    for (const sentenceId of sentenceIds) {
      if (_checkArticlesAlreadyHasSentence(articles, sentenceId)) continue;
      const { article, readCount: _readCount } =
        await _getArticleBySentenceId(sentenceId);
      readCount += _readCount;
      if (!article) continue;

      articles.push(article);
    }
  }
  return { articles };
};

const _getArticleBySentenceId = async (
  sentenceId: string,
): Promise<{ article: Article | undefined; readCount: number }> => {
  if (!sentenceId) return { article: undefined, readCount: 0 };

  const res = await fetch(
    fetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.articles,
      where: ["sentenceIds", "ARRAY_CONTAINS", sentenceId],
    }),
  );
  const { docs, readCount } = await getDocs(res);
  const articles = docs.map((doc) => buildArticle(doc));
  global.readCount += readCount;
  console.log(
    "_getArticleBySentenceId",
    docs.length,
    "readCount: ",
    global.readCount,
  );
  return { article: articles.at(0), readCount };
};

// form で　１つずつ　sentenceIds を取得して、 すべての form で取得された共通の sentenceIds を抽出する
// byForms の方が効率が良い？
export const _getInvertedIndexByForm = async (
  form: string,
): Promise<{ invertedIndex: InvertedIndex | undefined }> => {
  const res = await fetch(
    fetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.invertedIndexes,
      where: ["form", "EQUAL", form],
      tags: [REVALIDATE_TAGS.invertedIndexByForm], // sentence を変更した時は、これを update しないと、 seartch に反映されない
    }),
  );
  const { docs, readCount } = await getDocs(res);
  const results = docs.map((doc) => buildInvertedIndex(doc));
  global.readCount += readCount;
  console.log(
    "_getInvertedIndexByForm",
    docs.length,
    "readCount: ",
    global.readCount,
  );
  return { invertedIndex: results.at(0) };
};

export const getRecentSentences = async (
  limit: number,
): Promise<{ sentences: Sentence[] }> => {
  const res = await fetch(
    fetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.sentences,
      orderBy: ["createdAt", "desc"],
      limit,
      tags: [REVALIDATE_TAGS.senences],
    }),
  );

  const { docs, readCount } = await getDocs(res);
  global.readCount += readCount;
  console.log(
    "getRecentSentences",
    docs.length,
    "readCount: ",
    global.readCount,
  );
  const sentences = docs.map((doc) => buildSentence(doc));
  return { sentences };
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
  let totalCount = 0;

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
              `${PROJECT_PATH}/${COLLECTIONS.sentences}/${sentenceId}`,
          ),
        ],
        tags: [REVALIDATE_TAGS.senences],
      }),
    );
    const { docs, readCount } = await getDocs(res);
    global.readCount += readCount;
    console.log(
      "getSentencesByIds",
      docs.length,
      "readCount: ",
      global.readCount,
    );
    const sentences = docs.map((doc) => buildSentence(doc));
    result = [...result, ...sentences];
    totalCount += readCount;
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
    const { invertedIndex } = await _getInvertedIndexByForm(form);

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

  return {
    docs,
    readTime,
    readCount: (json as any[]).length,
  };
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
