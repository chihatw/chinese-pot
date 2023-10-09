import { Badge } from "@/components/ui/badge";

import { VOWEL_PAIRS } from "@/features/pinyin/constants/vowels";
import { pinyinColor } from "@/features/pinyin/services/pinyinColor";

const MinorVowelsRow = ({ startAt }: { startAt: string }) => {
  return (
    <div className="flex flex-wrap">
      {Object.keys(VOWEL_PAIRS)
        .filter((key) => key.at(0) === startAt)
        .map((key) => {
          const value = VOWEL_PAIRS[key];
          return (
            <div key={key} className="flex flex-nowrap">
              <Badge variant="outline" className={pinyinColor(key)}>
                {key}
              </Badge>
              <Badge
                key={value}
                variant="outline"
                className={pinyinColor(value)}
              >
                {value}
              </Badge>
            </div>
          );
        })}
    </div>
  );
};

export default MinorVowelsRow;
