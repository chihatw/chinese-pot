"server only";

import { VOWEL_PAIRS } from "@/features/pinyin";
import { getHanzis } from "../services/firestore";
import { getVowelCounts } from "../services/util";
import HanziLine from "./HanziLine";
import VowelRow from "./VowelRow";

const HanziList = async () => {
  const hanzis = await getHanzis();

  const vowelCounts = getVowelCounts(hanzis);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-4xl font-extrabold">{`Hanzi List - ${hanzis.length}`}</div>
      <div className="space-y-1">
        <div className="space-y-1">
          {Object.entries(vowelCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([vowel, count]) => (
              <VowelRow
                key={vowel}
                vowel={vowel}
                hanzis={hanzis.filter((hanzi) => {
                  const target: string[] = [vowel];
                  const pair = VOWEL_PAIRS[vowel as keyof typeof VOWEL_PAIRS];
                  !!pair && target.push(pair);
                  return target.includes(hanzi.pinyin.vowel);
                })}
              />
            ))}
        </div>
        {hanzis.slice(0, 4).map((hanzi) => (
          <HanziLine key={hanzi.id} hanzi={hanzi} />
        ))}
      </div>
    </div>
  );
};

export default HanziList;
