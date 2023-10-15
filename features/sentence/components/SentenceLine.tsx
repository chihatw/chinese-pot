import { Article } from "@/features/article";
import { PinyinHanzi } from "@/features/hanzi";
import { Sentence, buildSentenceChars } from "@/features/sentence";
import Link from "next/link";

const SentenceLine = ({
  sentence,
  highlight,
  textSize,
  article,
}: {
  sentence: Sentence;
  highlight?: string;
  textSize?: string;
  article?: Article;
}) => {
  const sentenceChars = buildSentenceChars(sentence, highlight || "");
  return (
    <div className="grid">
      <div className="flex flex-wrap gap-1 ">
        {sentenceChars.map((char, index) => (
          <PinyinHanzi key={index} {...char} textSize={textSize} />
        ))}
      </div>
      {article ? (
        <Link href={`/article/${article.id}`}>
          <div className="w-96 truncate text-xs font-extralight text-gray-500">
            {article.title}
          </div>
        </Link>
      ) : (
        <div className="text-xs font-extralight text-gray-500">
          {sentence.id}
        </div>
      )}
    </div>
  );
};

export default SentenceLine;
