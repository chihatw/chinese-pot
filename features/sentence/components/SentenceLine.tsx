import { PinyinHanzi } from "@/features/hanzi";
import { Sentence, buildSentenceChars } from "@/features/sentence";

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
    <div className="grid gap-0">
      <div className="flex flex-wrap gap-1 ">
        {sentenceChars.map((char, index) => (
          <PinyinHanzi key={index} {...char} textSize={textSize} />
        ))}
      </div>
      <div className="text-xs font-extralight text-gray-500">{sentence.id}</div>
    </div>
  );
};

export default SentenceLine;
