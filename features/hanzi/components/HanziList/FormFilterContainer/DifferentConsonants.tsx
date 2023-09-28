import { Hanzi } from "@/features/hanzi";
import { getDifferentConsonants } from "@/features/hanzi/services/util";
import { PinyinBadge } from "@/features/pinyin";
import { useHanzis } from "../HanzisContextProvider";

const DifferentConsonants = ({ hanzi }: { hanzi: Hanzi }) => {
  const { hanzis: db } = useHanzis();
  const differentConsonants = getDifferentConsonants(db, hanzi);

  return (
    <div className="space-y-2">
      <div className="relative grid grid-cols-[80px,1fr] gap-7 rounded bg-white p-5">
        <div className="absolute left-2 top-1 text-xs font-light text-gray-500">
          子音兄弟
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div>{hanzi.form}</div>
          <div className="flex">
            <PinyinBadge pinyin={hanzi.pinyin} />
          </div>
        </div>
        <div className="space-y-1">
          {Object.entries(differentConsonants).map(([consonant, hanzis]) => (
            <div key={consonant}>
              <div className="grid grid-cols-[88px,1fr] gap-2">
                <div className="flex items-center justify-start">
                  <PinyinBadge pinyin={hanzis.at(0)!.pinyin} />
                </div>
                <div className="space-x-1">
                  {hanzis.map((hanzi) => (
                    <span key={hanzi.id} className="text-sm">
                      {hanzi.form}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DifferentConsonants;
