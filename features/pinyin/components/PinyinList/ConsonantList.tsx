import { Badge } from "@/components/ui/badge";

import { CONSONANTS } from "../../constants/consonants";
import { pinyinColor } from "../../services/pinyinColor";

const ConsonantList = () => {
  return (
    <div className="grid max-w-md gap-y-4">
      <div className="text-4xl font-bold">子音</div>

      <div>
        <div className="text-xl font-bold">{`子音一覧 - ${CONSONANTS.length}`}</div>
        <div className="flex flex-wrap gap-x-1">
          {CONSONANTS.map((consonant) => (
            <Badge
              key={consonant}
              variant="outline"
              className={pinyinColor(consonant)}
            >
              {consonant}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsonantList;
