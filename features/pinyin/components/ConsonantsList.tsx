import { Badge } from "@/components/ui/badge";

import { CONSONANTS, ONE_CHAR_CONSONANTS, TWO_CHAR_CONSONANTS } from "..";
import { pinyinColor } from "../services/pinyinColor";

const ConsonantsList = () => {
  return (
    <div className="grid max-w-md gap-y-4">
      <div className="text-4xl font-extrabold">Consonant List</div>
      <div>
        <div className="text-xl font-extrabold">{`One Char Consonants - ${ONE_CHAR_CONSONANTS.length}`}</div>
        <div>
          {ONE_CHAR_CONSONANTS.map((consonant) => (
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
      <div>
        <div className="text-xl font-extrabold">{`Two Char Consonants - ${TWO_CHAR_CONSONANTS.length}`}</div>
        <div>
          {TWO_CHAR_CONSONANTS.map((consonant) => (
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
      <div>
        <div className="text-xl font-extrabold">{`Consonants - ${CONSONANTS.length}`}</div>
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

export default ConsonantsList;
