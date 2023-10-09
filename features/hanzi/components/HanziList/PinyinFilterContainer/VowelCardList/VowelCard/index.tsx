"use client";
import { Separator } from "@/components/ui/separator";

import { Hanzi } from "@/features/hanzi";
import VowelConsonantList from "./VowelConsonantList";
import VowelCount from "./VowelCount";
import VowelToneList from "./VowelToneList";

const VowelCard = ({ vowel, hanzis }: { vowel: string; hanzis: Hanzi[] }) => {
  return (
    <div className="rounded-lg bg-white p-5 shadow-lg">
      <div className="grid grid-cols-[36px_auto] gap-x-4">
        <VowelCount vowel={vowel} count={hanzis.length} />
        <div>
          <VowelConsonantList hanzis={hanzis} />
          <Separator className="mb-4" />
          <VowelToneList hanzis={hanzis} />
        </div>
      </div>
    </div>
  );
};

export default VowelCard;
