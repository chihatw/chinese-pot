import { getHanzis } from "../../services/firestore";
import { getHanzisByVowel, getVowelCounts } from "../../services/util";
import VowelCard from "./VowelCard";

const HanziList = async () => {
  const hanzis = await getHanzis();

  const hanzisOmitMarks = hanzis.filter((hanzi) => !!hanzi.pinyin.tone);
  // const marks = hanzis.filter((hanzi) => !hanzi.pinyin.tone);
  // console.log({ marks });

  const vowelCounts = getVowelCounts(hanzisOmitMarks);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-4xl font-extrabold">Hanzi List</div>

      <div className="space-y-1">
        <div className="pr-2 text-right font-light">{`total: ${hanzisOmitMarks.length}`}</div>
        {Object.entries(vowelCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([vowel]) => (
            <VowelCard
              key={vowel}
              vowel={vowel}
              hanzis={getHanzisByVowel(hanzisOmitMarks, vowel)}
            />
          ))}
      </div>
    </div>
  );
};

export default HanziList;
