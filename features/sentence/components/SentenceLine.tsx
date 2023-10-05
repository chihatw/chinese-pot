import { PinyinHanzi } from "@/features/hanzi";
import { Sentence } from "..";
import { buildSentenceChars } from "../services/utils";

const SentenceLine = ({
  sentence,
  highlight,
  textSize,
}: {
  sentence: Sentence;
  highlight?: string;
  textSize?: string;
}) => {
  const sentenceChars = buildSentenceChars(sentence, highlight || "");
  return (
    <div className="flex flex-wrap gap-1 ">
      {sentenceChars.map((char, index) => (
        <PinyinHanzi key={index} {...char} textSize={textSize} />
      ))}
    </div>
  );
};

export default SentenceLine;
