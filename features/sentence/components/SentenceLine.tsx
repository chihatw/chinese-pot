import { SentenceHanzi } from "@/features/hanzi";
import { Sentence } from "..";
import { buildSentenceChars } from "../services/utils";

const SentenceLine = ({
  sentence,
  highlight,
}: {
  sentence: Sentence;
  highlight: string;
}) => {
  const sentenceChars = buildSentenceChars(sentence, highlight);
  return (
    <div className="flex flex-wrap gap-1 rounded bg-white p-2">
      {sentenceChars.map((char, index) => (
        <SentenceHanzi key={index} {...char} />
      ))}
    </div>
  );
};

export default SentenceLine;
