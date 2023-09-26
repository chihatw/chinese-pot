import { Pinyin, PinyinBadge } from "..";

const PinyinLine = ({ pinyins }: { pinyins: (Pinyin | undefined)[] }) => {
  return (
    <div className="flex flex-wrap gap-x-1 px-2">
      {pinyins.map((pinyin, index) => (
        <PinyinBadge key={index} pinyin={pinyin} />
      ))}
    </div>
  );
};

export default PinyinLine;
