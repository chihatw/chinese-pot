import { Pinyin } from "@/features/pinyin";
import { buildPinyins } from "@/features/pinyin/services/buildPinyin";
import { nanoid } from "nanoid";
import {
  Article,
  Article_SentenceIds,
  Article_old,
  Article_raw,
  Sentence,
  SentenceMidashiPinyin_raw,
  SentencePinyins_Temp,
  SentenceUniGram,
  SentenceUniGram_raw,
  Sentence_Article_Relation,
  Sentence_Pinyins_Relation,
  Sentence_UniGrams_Relation,
  Sentence_raw,
} from "..";

export const buildArticle_old = (raw: Article_raw): Article_old => {
  return {
    id: raw._id,
    title: raw.title,
    createdAt: Number(raw.createdAt.$numberLong),
  };
};

export const buildArticle = (
  old: Article_old,
  as: Article_SentenceIds,
): Article => {
  const sentenceIds = as[old.id] || [];
  return {
    id: old.id,
    title: old.title,
    createdAt: old.createdAt,
    sentenceIds,
  };
};

export const buildSentence = (
  relation: Sentence_Article_Relation,
): Sentence => {
  return {
    id: relation.id,
    text: "",
    pinyins: [],
    createdAt: relation.createdAt,
  };
};

export const buildSentenceArticleRelation = (
  raw: Sentence_raw,
): Sentence_Article_Relation => {
  return {
    id: raw._id,
    articleId: raw.articleId,
    createdAt: Number(raw.createdAt.$numberLong),
    index: raw.index,
  };
};

export const buildArticleSentenceIds = (
  sentences: Sentence_Article_Relation[],
): Article_SentenceIds => {
  return sentences.reduce((acc, cur) => {
    const value = acc[cur.articleId]
      ? [...acc[cur.articleId], cur.id].sort((a, b) => {
          const sentenceA = sentences.find((s) => s.id === a)!;
          const sentenceB = sentences.find((s) => s.id === b)!;
          return sentenceA.index - sentenceB.index;
        })
      : [cur.id];

    return { ...acc, [cur.articleId]: value };
  }, {} as Article_SentenceIds);
};

export const buildSentenceUniGramRelations = (
  unigrams: SentenceUniGram[],
): Sentence_UniGrams_Relation => {
  return unigrams.reduce((acc, cur) => {
    const value = acc[cur.sentenceId]
      ? [...acc[cur.sentenceId], cur].sort((a, b) => {
          const unigramA = unigrams.find((u) => u.id === a.id)!;
          const unigramB = unigrams.find((u) => u.id === b.id)!;
          return unigramA.offset - unigramB.offset;
        })
      : [cur];
    return { ...acc, [cur.sentenceId]: value };
  }, {} as Sentence_UniGrams_Relation);
};

export const buildSentenceTextRelations = (
  relation: Sentence_UniGrams_Relation,
) => {
  const sentenceIds = Object.keys(relation);

  const result: { [sentenceId: string]: string } = {};

  for (const sentenceId of sentenceIds) {
    result[sentenceId] = relation[sentenceId]
      .map((uniGram) => uniGram.form)
      .join("");
  }

  return result;
};

export const buildUniGram = (raw: SentenceUniGram_raw): SentenceUniGram => {
  return {
    id: nanoid(),
    form: raw.char,
    offset: raw.offset,
    sentenceId: raw.sentenceId,
  };
};

export const buildSentencePinyins_temp = (cur: SentenceMidashiPinyin_raw) => {
  return {
    offset: cur.offset,
    pinyin: buildPinyins(cur.yomi),
  };
};

export const buildSentencePinyinsRelations_temp = (
  sentenceMidashiPinyins: SentenceMidashiPinyin_raw[],
) => {
  return sentenceMidashiPinyins.reduce(
    (acc, cur) => {
      const sentencePinyins = buildSentencePinyins_temp(cur);
      const value = acc[cur.sentenceId]
        ? [...acc[cur.sentenceId], sentencePinyins].sort(
            (a, b) => a.offset - b.offset,
          )
        : [sentencePinyins];
      return { ...acc, [cur.sentenceId]: value };
    },
    {} as {
      [sentenceId: string]: SentencePinyins_Temp[];
    },
  );
};

export const buildSentencePinyinsRelations = (sentencePinyinsRelations: {
  [sentenceId: string]: SentencePinyins_Temp[];
}) => {
  const result: Sentence_Pinyins_Relation = {};

  for (const sentenceId of Object.keys(sentencePinyinsRelations)) {
    const relation = sentencePinyinsRelations[sentenceId];

    const sentencePinyins: Pinyin[] = [];
    for (const item of relation) {
      const pinyins = item.pinyin;
      for (const pinyin of pinyins) {
        if (!pinyin) {
          continue;
        }
        sentencePinyins.push(pinyin);
      }
    }

    result[sentenceId] = sentencePinyins;
  }
  return result;
};
