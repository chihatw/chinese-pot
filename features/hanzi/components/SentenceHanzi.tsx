import { buildPinyin } from "@/features/pinyin/services/buildPinyin";
import { fontPinyin } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { buildToneMark } from "../services/util";

const SentenceHanzi = ({
  pinyinStr,
  isHighlight,
  form,
}: {
  pinyinStr: string;
  isHighlight?: boolean;
  form: string;
}) => {
  const pinyin = buildPinyin(pinyinStr);
  const mark = buildToneMark(pinyin?.tone);

  return (
    <div className="relative flex flex-col items-center gap-y-0">
      <div
        className={cn(
          fontPinyin.className,
          "absolute text-destructive",
          mark === "•" ? "-top-3" : "-top-2",
        )}
      >
        {mark}
      </div>
      <div className="-mb-1.5 origin-center scale-75 text-xs text-gray-500">
        {(pinyin?.consonant || "") + (pinyin?.vowel || "")}
      </div>
      <div
        className={cn(
          isHighlight ? "text-destructive" : "text-inherit",
          "text-xl",
        )}
      >
        {form}
      </div>
    </div>
  );
};

export default SentenceHanzi;
