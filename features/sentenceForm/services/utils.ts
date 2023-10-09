import { Hanzi } from "@/features/hanzi";
import { getPinyinStr } from "@/features/pinyin";
import { Sentence } from "@/features/sentence";

export const buildSentenceFromHanzis = (
  hanzis: Hanzi[],
  sentenceId: string,
): Sentence => {
  return {
    id: sentenceId,
    text: hanzis.map((h) => h.form).join(""),
    pinyinsStr: hanzis.map((h) => getPinyinStr(h.pinyin)).join(" "),
    createdAt: Date.now(),
  };
};

export const getSelectedHanziIds = (forms: string, hanzis: Hanzi[]) => {
  return forms.split("").map((form) => {
    // hanzis から form で厳選
    const items = hanzis
      .filter((h) => h.form === form)
      .sort((a, b) => b.count - a.count);
    // １つ目の hanzi の id を代入
    return items.at(0)?.id || "";
  });
};

export const updateHanzis = (hanzis: Hanzi[], sentenceId: string): Hanzi[] => {
  return hanzis.map((h) => ({
    ...h,
    count: h.count + 1,
    latestSentenceId: sentenceId,
  }));
};
