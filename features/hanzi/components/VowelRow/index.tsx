import { VOWEL_PAIRS } from "@/features/pinyin";
import PinyinBadges from "@/features/pinyin/components/PinyinBadges";
import { Hanzi } from "../..";
import { getConsonantCounts } from "../../services/util";
import VowelCount from "./VowelCount";

const VowelRow = ({ vowel, hanzis }: { vowel: string; hanzis: Hanzi[] }) => {
  const consonantCounts = getConsonantCounts(hanzis);
  const orederdConsonantCounts = Object.entries(consonantCounts).sort(
    (a, b) => b[1] - a[1],
  );
  return (
    <div className="rounded-lg bg-white p-5 shadow-lg">
      <div className="grid grid-cols-[36px_auto] gap-x-4">
        <VowelCount vowel={vowel} count={hanzis.length} />
        <div className="flex flex-wrap gap-2">
          {orederdConsonantCounts.map(([consonant, count]) => (
            <VowelRowBadge
              consonant={consonant}
              count={count}
              vowel={vowel}
              key={consonant}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VowelRow;

const VowelRowBadge = ({
  count,
  consonant,
  vowel,
}: {
  count: number;
  consonant: string;
  vowel: string;
}) => {
  const pair = VOWEL_PAIRS[vowel as keyof typeof VOWEL_PAIRS];
  // 弱母音で子音がない場合、語頭型を使う
  if (!!pair && !consonant) {
    vowel = pair;
  }
  return (
    <div className="flex items-center gap-x-1">
      <PinyinBadges pinyin={{ consonant, vowel, tone: "" }} />
      <div>{count}</div>
    </div>
  );
};
