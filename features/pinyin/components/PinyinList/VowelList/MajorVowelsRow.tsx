import { Badge } from "@/components/ui/badge";

import { MAJOR_VOWELS } from "@/features/pinyin/constants/vowels";
import { pinyinColor } from "@/features/pinyin/services/pinyinColor";

const MajorVowelsRow = ({ startAt }: { startAt: string }) => {
  return (
    <div>
      {MAJOR_VOWELS.filter((vowel) => vowel.at(0) === startAt).map((vowel) => (
        <Badge key={vowel} variant="outline" className={pinyinColor(vowel)}>
          {vowel}
        </Badge>
      ))}
    </div>
  );
};

export default MajorVowelsRow;
