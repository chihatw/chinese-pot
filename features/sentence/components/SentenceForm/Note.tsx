import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const SENTENCE_TYPE = {
  id: "string",
  text: "string",
  pinyinsStr: "string",
  createdAt: "number",
};

const HANZI_TYPE = {
  id: "string",
  form: "string",
  pinyin: "Pinyin",
};

const INVERTED_INDEX = {
  id: "string",
  form: "string",
  count: "number",
  sentenceIds: "string[]",
};

const TYPES = {
  Sentence: SENTENCE_TYPE,
  Hanzi: HANZI_TYPE,
  "Inverted Index": INVERTED_INDEX,
};

const Note = () => {
  return (
    <div className="p-2 pt-8 font-extralight">
      <div className="space-y-8 pb-8">
        {Object.keys(TYPES).map((item) => (
          <div key={item} className="grid grid-cols-[120px,1fr] gap-2">
            <div className="text-right text-xs font-extralight tracking-wider">{`${item}:`}</div>
            <pre
              className={cn(
                fontSans.className,
                "text-xs font-extralight tracking-wider",
              )}
            >
              {JSON.stringify(TYPES[item as keyof typeof TYPES], null, 4)}
            </pre>
          </div>
        ))}
      </div>

      <div className="text-sm font-extralight leading-6">
        🔥 Sentence.text の各文字は Hanzis に
        <span className="font-bold">登録されてい</span>なければならない
        <br />
        🔥 Sentence.pinyinStr の各拼音は Hanzis に
        <span className="font-bold">登録されてい</span>なければならない
        <br />
        🔥 Sentence.text の各文字は InvertedIndexes に
        <span className="font-bold">登録し</span>なければならない
      </div>
    </div>
  );
};
export default Note;
