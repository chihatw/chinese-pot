"server only";

import { getHanzis } from "../services/firestore";
import HanziLine from "./HanziLine";

const HanziList = async () => {
  const hanzis = await getHanzis();

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-4xl font-extrabold">Hanzi List</div>
      <div className="space-y-1">
        {hanzis.map((hanzi) => (
          <HanziLine key={hanzi.id} hanzi={hanzi} />
        ))}
      </div>
    </div>
  );
};

export default HanziList;
