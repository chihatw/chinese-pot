import { Hanzi_old } from "../../../../..";
import { getToneCounts } from "../../../../../services/util";
import VowelToneBadge from "./VowelToneBadge";

const VowelToneList = ({ hanzis }: { hanzis: Hanzi_old[] }) => {
  const toneCounts = getToneCounts(hanzis);
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(toneCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([tone, count]) => (
          <VowelToneBadge
            key={tone}
            hanzis={hanzis.filter((hanzi) => hanzi.pinyin.tone === tone)}
          />
        ))}
    </div>
  );
};

export default VowelToneList;
