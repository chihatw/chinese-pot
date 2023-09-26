import { Badge } from "@/components/ui/badge";
import { MAJOR_FULL_VOWELS } from "..";
import { pinyinColor } from "../services/pinyinColor";

const MajorVowelsRow = ({ startAt }: { startAt: string }) => {
  return (
    <div>
      {MAJOR_FULL_VOWELS.filter((vowel) => vowel.at(0) === startAt).map(
        (vowel) => (
          <Badge key={vowel} variant="outline" className={pinyinColor(vowel)}>
            {vowel}
          </Badge>
        ),
      )}
    </div>
  );
};

export default MajorVowelsRow;
