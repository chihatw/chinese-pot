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
