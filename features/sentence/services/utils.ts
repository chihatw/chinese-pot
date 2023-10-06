import {
  Hanzi,
  buildHanziId,
  getHanzisByVowel,
  getVowelCounts,
} from "@/features/hanzi";

import { CONSONANTS } from "@/features/pinyin";
import { buildPinyin } from "@/features/pinyin/services/buildPinyin";
import { getPinyinStr } from "@/features/pinyin/services/utils";
import { Sentence } from "..";

type SentenceChar = {
  form: string;
  pinyinStr: string;
  isHighlight?: boolean;
};

export const buildSentenceChars = (
  sentence: Sentence,
  highlight: string,
): SentenceChar[] => {
  const pinyinStrs = sentence.pinyinsStr.split(" ");
  const isHighlights = buildIsHighlights(sentence.text, highlight);

  return sentence.text.split("").map((form, i) => ({
    form,
    pinyinStr: pinyinStrs[i],
    isHighlight: isHighlights[i],
  }));
};

const buildIsHighlights = (text: string, highlight: string) => {
  return (
    text
      // text を highlight で切り分ける
      .split(highlight)
      // 切り分けられた各文字を f に置換する
      .map((i) => "f".repeat(i.length))
      // highlight を t で置換した文字列で、再結合する
      .join("t".repeat(highlight.length))
      // f と t の文字列を1文字ずつ切り分けて
      .split("")
      // Boolean で置換する
      .map((i) => i == "t")
  );
};

export const buildHanzisFromSentence = (sentence: Sentence): Hanzi[] => {
  const forms = sentence.text.split("");
  const pinyinStrs = sentence.pinyinsStr.split(" ");
  if (forms.length !== pinyinStrs.length)
    throw new Error(`invalid sentence: ${JSON.stringify(sentence, null, 2)}`);
  return forms.map((form, index) => {
    const pinyin = buildPinyin(pinyinStrs[index]);
    return {
      id: buildHanziId(form, pinyin),
      form,
      pinyin: buildPinyin(pinyinStrs[index]),
      count: 0,
      latestSentenceId: "",
    };
  });
};

export function buildSentenceFromHanzis(
  hanzis: Hanzi[],
  sentenceId: string,
): Sentence {
  return {
    id: sentenceId,
    text: hanzis.map((h) => h.form).join(""),
    pinyinsStr: hanzis.map((h) => getPinyinStr(h.pinyin)).join(" "),
    createdAt: Date.now(),
  };
}

export function updateHanzis(hanzis: Hanzi[], sentenceId: string): Hanzi[] {
  return hanzis.map((h) => ({
    ...h,
    count: h.count + 1,
    latestSentenceId: sentenceId,
  }));
}

export function buildHanzisGroupedByConsonantVowel(hanzis: Hanzi[]) {
  const items: { vowel: string; consonant: string; hanzis: Hanzi[] }[] = [];

  // hanzis を母音ごとに集計（語頭形は語中形に含める）
  const vowelCounts = getVowelCounts(hanzis);
  for (const vowel of Object.keys(vowelCounts)) {
    // 語頭形は語中形に含めて抽出
    const vowelHanzis = getHanzisByVowel(hanzis, vowel);

    // 子音がない場合、無子音のグループとして分類
    const filtered = vowelHanzis.filter((h) => !h.pinyin.consonant);
    if (!!filtered.length) {
      items.push({ vowel, consonant: "", hanzis: filtered });
    }

    // 子音がある場合、子音によって分類
    for (const consonant of CONSONANTS) {
      const filtered = vowelHanzis.filter(
        (h) => h.pinyin.consonant === consonant,
      );

      if (!!filtered.length) {
        items.push({ vowel, consonant, hanzis: filtered });
      }
    }
  }
  return items;
}
