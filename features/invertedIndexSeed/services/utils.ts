import { SentenceUnigram } from "@/features/sentenceUnigram";
import { InvertedIndexes_old } from "../schema";

export const buildInvertedIndexes = (
  unigrams: SentenceUnigram[],
): InvertedIndexes_old => {
  return unigrams.reduce((acc, cur) => {
    const value = acc[cur.form]
      ? [...acc[cur.form], cur.sentenceId].filter(
          (item, index, self) => self.indexOf(item) === index,
        )
      : [cur.sentenceId];
    return { ...acc, [cur.form]: value };
  }, {} as InvertedIndexes_old);
};

export const getInvertedIndexCounts = (
  invertedIndexes: InvertedIndexes_old,
): { [form: string]: number } => {
  return Object.keys(invertedIndexes).reduce(
    (acc, key) => {
      return { ...acc, [key]: invertedIndexes[key].length };
    },
    {} as { [form: string]: number },
  );
};
