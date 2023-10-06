import { Hanzi } from "@/features/hanzi";
import { getDifferentTones } from "@/features/hanzi/services/util";
import { PinyinBadge } from "@/features/pinyin";

const DifferentTones = ({
  hanzi,
  hanzis,
}: {
  hanzi: Hanzi;
  hanzis: Hanzi[];
}) => {
  const differentTones = getDifferentTones(hanzis, hanzi);
  return (
    <div className="space-y-2">
      <div
        key={hanzi.id}
        className="relative grid grid-cols-[80px,1fr] gap-7 rounded bg-white p-5"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div>{hanzi.form}</div>
          <div className="flex">
            <PinyinBadge pinyin={hanzi.pinyin} />
          </div>
        </div>
        <div className="space-y-1">
          {Object.entries(differentTones).map(([tone, hanzis]) => (
            <div key={tone}>
              <div className="grid grid-cols-[auto,1fr] gap-2">
                <div className="grid place-items-center">
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

export default DifferentTones;
