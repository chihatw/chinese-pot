import { Badge } from "@/components/ui/badge";

import {
  EXTROVERTED_VOWELS,
  INTROVERTED_VOWELS,
  MAJOR_FULL_VOWELS,
  VOWELS,
  VOWEL_PAIRS,
} from "..";
import { pinyinColor } from "../services/pinyinColor";
import MajorVowelsRow from "./MajorVowelsRow";
import MinorVowelsRow from "./MinorVowelsRow";

const VowelsList = () => {
  return (
    <div className="grid max-w-md gap-y-5">
      <div className="text-4xl font-extrabold">Vowel List</div>
      <div className="space-y-2">
        <div className="text-xl font-bold">{`子音がなくても形が同じ母音 - ${MAJOR_FULL_VOWELS.length}`}</div>
        <MajorVowelsRow startAt="a" />
        <MajorVowelsRow startAt="o" />
        <MajorVowelsRow startAt="e" />
      </div>
      <div className="space-y-2">
        <div className="text-xl font-bold">
          {`子音の有無で形が変わる母音 - ${Object.keys(VOWEL_PAIRS).length}`}
          <span className="pl-1 text-base">組</span>
        </div>
        <MinorVowelsRow startAt="v" />
        <MinorVowelsRow startAt="i" />
        <MinorVowelsRow startAt="u" />
      </div>
      <div>
        <div className="text-xl font-bold">{`子音が必ずつく母音 - ${EXTROVERTED_VOWELS.length}`}</div>
        <div>
          {EXTROVERTED_VOWELS.map((vowel) => (
            <Badge key={vowel} variant="outline" className={pinyinColor(vowel)}>
              {vowel}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xl font-bold">{`子音がつかない母音 - ${INTROVERTED_VOWELS.length}`}</div>
        <div>
          {INTROVERTED_VOWELS.map((vowel) => (
            <Badge key={vowel} variant="outline" className={pinyinColor(vowel)}>
              {vowel}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xl font-extrabold">{`Vowels - ${VOWELS.length}`}</div>
        <div>
          {VOWELS.map((vowel) => (
            <Badge key={vowel} variant="outline" className={pinyinColor(vowel)}>
              {vowel}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VowelsList;
