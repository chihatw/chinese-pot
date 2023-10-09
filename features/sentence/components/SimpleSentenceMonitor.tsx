import { PinyinBadge } from "@/features/pinyin";
import { buildPinyin } from "@/features/pinyin/services/buildPinyin";
import { Sentence } from "../schema";

const SimpleSentenceMonitor = ({ sentence }: { sentence: Sentence }) => {
  return (
    <div>
      <div className="text-lg font-light tracking-wider">{sentence?.text}</div>
      <div className="flex flex-wrap gap-1">
        {sentence?.pinyinsStr.split(" ").map((pinyinStr, index) => {
          if (pinyinStr === "*") return <span key={index}></span>;

          const pinyin = buildPinyin(pinyinStr);
          return <PinyinBadge key={index} pinyin={pinyin} />;
        })}
      </div>
    </div>
  );
};

export default SimpleSentenceMonitor;
