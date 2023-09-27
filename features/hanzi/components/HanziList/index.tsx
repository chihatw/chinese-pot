import { getHanzis } from "../../services/firestore";
import FormFilterContainer from "./FormFilterContainer";
import HanzisContextProvider from "./HanzisContextProvider";
import MarksMonitor from "./MarksMonitor";
import PinyinFilterContainer from "./PinyinFilterContainer";

const HanziList = async () => {
  const hanzis = await getHanzis();
  const hanzisOmitMarks = hanzis.filter((hanzi) => !!hanzi.pinyin.tone);
  const marks = hanzis.filter((hanzi) => !hanzi.pinyin.tone);

  return (
    <HanzisContextProvider hanzis={hanzisOmitMarks}>
      <div className="w-full max-w-md space-y-8">
        <MarksMonitor marks={marks} />
        <FormFilterContainer hanzis={hanzisOmitMarks} />
        <PinyinFilterContainer hanzis={hanzisOmitMarks} />
      </div>
    </HanzisContextProvider>
  );
};

export default HanziList;
