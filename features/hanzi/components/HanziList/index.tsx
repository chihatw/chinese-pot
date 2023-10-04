"server only";

import { Hanzi_old } from "../..";
import FormFilterContainer from "./FormFilterContainer";
import HanzisContextProvider from "./HanzisContextProvider";
import MarksMonitor from "./MarksMonitor";
import PinyinFilterContainer from "./PinyinFilterContainer";

const HanziList = ({ hanzis }: { hanzis: Hanzi_old[] }) => {
  // note const hanzis = await getHanzis(); ここで取得すると not found fs が出る
  const hanzisOmitMarks = hanzis.filter((hanzi) => !!hanzi.pinyin.tone);
  const marks = hanzis.filter((hanzi) => !hanzi.pinyin.tone);

  return (
    <HanzisContextProvider hanzis={hanzisOmitMarks}>
      <div className="space-y-8">
        <MarksMonitor marks={marks} />
        <FormFilterContainer hanzis={hanzisOmitMarks} />
        <PinyinFilterContainer hanzis={hanzisOmitMarks} />
      </div>
    </HanzisContextProvider>
  );
};

export default HanziList;
