import { getHanzis } from "../../services/firestore";
import FilterContainer from "./FilterContainer";

const HanziList = async () => {
  const hanzis = await getHanzis();

  const hanzisOmitMarks = hanzis.filter((hanzi) => !!hanzi.pinyin.tone);
  // const marks = hanzis.filter((hanzi) => !hanzi.pinyin.tone);
  // console.log({ marks });

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-4xl font-extrabold">Hanzi List</div>
      <FilterContainer hanzis={hanzisOmitMarks} />
    </div>
  );
};

export default HanziList;
