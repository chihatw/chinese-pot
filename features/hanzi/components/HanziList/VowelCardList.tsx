import React from "react";
import { Hanzi } from "../..";
import { getHanzisByVowel, getVowelCounts } from "../../services/util";
import VowelCard from "./VowelCard";

export const VowelCardList = React.memo(function Dummy({
  hanzis,
}: {
  hanzis: Hanzi[];
}) {
  const vowelCounts = getVowelCounts(hanzis);
  return (
    <>
      <div className="pr-2 text-right font-light">{`total: ${hanzis.length}`}</div>
      {Object.entries(vowelCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([vowel]) => (
          <VowelCard
            key={vowel}
            vowel={vowel}
            hanzis={getHanzisByVowel(hanzis, vowel)}
          />
        ))}
    </>
  );
});

export default VowelCardList;
