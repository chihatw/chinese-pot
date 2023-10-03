import { Sentence, SentenceLine } from "@/features/sentence";
import { SEARCH_SENTENCES_MAX } from "../constants";

const SearchResultList = ({
  total,
  sentences,
  forms,
}: {
  total: number;
  sentences: Sentence[];
  forms: string;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span>{total}</span>
        {total > SEARCH_SENTENCES_MAX ? (
          <span className="text-xs text-black/40">
            結果が多すぎます。文字列を増やしてください
          </span>
        ) : null}
      </div>
      {sentences.map((sentence) => (
        <SentenceLine key={sentence.id} highlight={forms} sentence={sentence} />
      ))}
    </div>
  );
};

export default SearchResultList;
