import { Badge } from "@/components/ui/badge";

import {
  EXTROVERTED_VOWELS,
  INTROVERTED_VOWELS,
  MAJOR_VOWELS,
  VOWELS,
  VOWEL_PAIRS,
} from "@/features/pinyin/constants/vowels";

import { pinyinColor } from "@/features/pinyin/services/pinyinColor";
import MajorVowelsRow from "./MajorVowelsRow";
import MinorVowelsRow from "./MinorVowelsRow";

const VowelList = () => {
  return (
    <div className="grid max-w-md gap-y-5">
      <div className="text-4xl font-bold">母音</div>
      <div className="space-y-2">
        <div className="text-xl font-bold">{`硬母音 - ${MAJOR_VOWELS.length}`}</div>
        <MajorVowelsRow startAt="a" />
        <MajorVowelsRow startAt="o" />
        <MajorVowelsRow startAt="e" />
      </div>
      <div className="space-y-2">
        <div className="text-xl font-bold">
          {`軟母音 - ${Object.keys(VOWEL_PAIRS).length}`}
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
        <div className="text-xl font-bold">{`母音一覧 - ${VOWELS.length}`}</div>
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

export default VowelList;
