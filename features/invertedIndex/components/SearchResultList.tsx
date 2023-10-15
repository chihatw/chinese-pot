import { Article } from "@/features/article";
import { Sentence, SentenceLine } from "@/features/sentence";
import { SEARCH_SENTENCES_MAX } from "@/firebase/constants";

const SearchResultList = ({
  total,
  sentences,
  forms,
  articles,
}: {
  total: number;
  sentences: Sentence[];
  forms: string;
  articles: Article[];
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span>{total}</span>
        {total > SEARCH_SENTENCES_MAX ? (
          <span className="text-xs text-black/40">
            {`結果が ${SEARCH_SENTENCES_MAX} を超えます。文字列を増やしてください`}
          </span>
        ) : null}
      </div>
      <div className="space-y-3">
        {sentences.map((sentence) => {
          const article = articles.find((a) =>
            a.sentenceIds.includes(sentence.id),
          );
          return (
            <SentenceLine
              key={sentence.id}
              highlight={forms}
              sentence={sentence}
              article={article}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResultList;
