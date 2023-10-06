"server only";

import { Hanzi } from "../..";
import FormFilterContainer from "./FormFilterContainer";
import MarksMonitor from "./MarksMonitor";
import PinyinFilterContainer from "./PinyinFilterContainer";

const HanziList = ({ hanzis }: { hanzis: Hanzi[] }) => {
  const hanzisOmitMarks = hanzis.filter((hanzi) => !!hanzi.pinyin.tone);
  const marks = hanzis.filter((hanzi) => !hanzi.pinyin.tone);
  return (
    <div className="space-y-8">
      <MarksMonitor marks={marks} />
      <FormFilterContainer hanzis={hanzisOmitMarks} />
      <PinyinFilterContainer hanzis={hanzisOmitMarks} />
    </div>
  );
};

export default HanziList;
