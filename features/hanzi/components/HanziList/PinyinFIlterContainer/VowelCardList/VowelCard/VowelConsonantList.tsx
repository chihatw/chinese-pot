import { Hanzi } from "@/features/hanzi";

import { getConsonantCounts } from "@/features/hanzi/services/util";
import VowelConsonantBadge from "./VowelConsonantBadge";

const VowelConsonantList = ({ hanzis }: { hanzis: Hanzi[] }) => {
  const consonantCounts = getConsonantCounts(hanzis);
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(consonantCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([consonant]) => {
          const target = hanzis.filter(
            (hanzi) => hanzi.pinyin.consonant === consonant,
          );
          return <VowelConsonantBadge key={consonant} hanzis={target} />;
        })}
    </div>
  );
};

export default VowelConsonantList;
