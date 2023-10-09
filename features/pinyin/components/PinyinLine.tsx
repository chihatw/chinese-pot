import { Pinyin, PinyinBadge } from "@/features/pinyin";

const PinyinLine = ({ pinyins }: { pinyins: Pinyin[] }) => {
  return (
    <div className="flex flex-wrap gap-x-1 px-2">
      {pinyins.map((pinyin, index) => (
        <PinyinBadge key={index} pinyin={pinyin} />
      ))}
    </div>
  );
};

export default PinyinLine;
