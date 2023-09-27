import { getHanzis } from "../../services/firestore";
import MarksMonitor from "./MarksMonitor";
import PinyinFilterContainer from "./PinyinFilterContainer";

const HanziList = async () => {
  const hanzis = await getHanzis();
  const hanzisOmitMarks = hanzis.filter((hanzi) => !!hanzi.pinyin.tone);
  const marks = hanzis.filter((hanzi) => !hanzi.pinyin.tone);

  return (
    <div className="w-full max-w-md space-y-4">
      <MarksMonitor marks={marks} />
      <div className="bg-yellow-200 bg-opacity-40 p-4">👷 TODO: FormFilter</div>
      <PinyinFilterContainer hanzis={hanzisOmitMarks} />
    </div>
  );
};

export default HanziList;
