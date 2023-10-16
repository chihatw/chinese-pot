import { Hanzi } from "@/features/hanzi";
import { getPinyinStr } from "@/features/pinyin";
import { Sentence } from "@/features/sentence";
import { SENTENCE_TEXT_MAX } from "@/firebase/constants";
import { getHanzisByForms, getSentencesByIds } from "@/firebase/restapi";
import { SentenceFormProps } from "..";

export const buildSentence_from_selectedHanzis = (
  selectedHanzis: Hanzi[],
  sentenceId: string,
): Sentence => {
  return {
    id: sentenceId,
    text: selectedHanzis.map((h) => h.form).join(""),
    pinyinsStr: selectedHanzis.map((h) => getPinyinStr(h.pinyin)).join(" "),
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

export const updateCountAndLastestSentenceId_in_Hanzis = (
  hanzis: Hanzi[],
  sentenceId: string,
): Hanzi[] => {
  return hanzis.map((h) => ({
    ...h,
    count: h.count + 1,
    latestSentenceId: sentenceId,
  }));
};

/**
 *　文字列を受け取り 

   その文字列に含まれる漢字と同じ字形の漢字を取得

   また取得した漢字の latestSentence も取得する
 */
export const buildSentenceFormProps = async (
  forms: string,
): Promise<SentenceFormProps> => {
  if (forms.length > SENTENCE_TEXT_MAX) {
    console.error(`sentence text more than ${SENTENCE_TEXT_MAX}`);
    return { hanzis: [], forms: "", hanziSentences: [], total: 0 };
  }
  const forms_uniq = [...new Set(forms.split("").filter(Boolean))];

  // forms に含まれる Hanzi を取得
  const hanzis = forms_uniq.length ? await getHanzisByForms(forms_uniq) : [];
  const latestSentenceIds = [...new Set(hanzis.map((h) => h.latestSentenceId))];
  const { sentences, total } = await getSentencesByIds(latestSentenceIds);

  return { hanzis, forms, hanziSentences: sentences, total };
};
