import { Badge } from "@/components/ui/badge";
import { EXTROVERTED_VOWELS, MINOR_FULL_VOWELS, VOWEL_PAIRS } from "../../..";
import { pinyinColor } from "../../../services/pinyinColor";

const MinorVowelsRow = ({ startAt }: { startAt: string }) => {
  return (
    <div className="flex flex-wrap">
      {MINOR_FULL_VOWELS.filter((vowel) => !EXTROVERTED_VOWELS.includes(vowel))
        .filter((vowel) => vowel.at(0) === startAt)
        .map((vowel) => {
          const pair = VOWEL_PAIRS[vowel as keyof typeof VOWEL_PAIRS];
          return (
            <div key={vowel} className="flex flex-nowrap">
              <Badge variant="outline" className={pinyinColor(vowel)}>
                {vowel}
              </Badge>
              {pair ? (
                <Badge
                  key={`${vowel}pair`}
                  variant="outline"
                  className={pinyinColor(pair)}
                >
                  {pair}
                </Badge>
              ) : null}
            </div>
          );
        })}
    </div>
  );
};

export default MinorVowelsRow;
