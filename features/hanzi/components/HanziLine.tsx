import { PinyinLine } from "@/features/pinyin";
import { Hanzi } from "..";

const HanziLine = ({ hanzi }: { hanzi: Hanzi }) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="aspect-square h-12 bg-white p-2 text-center text-2xl">
        {hanzi.form}
      </div>
      <PinyinLine pinyins={[hanzi.pinyin]} />
    </div>
  );
};

export default HanziLine;
