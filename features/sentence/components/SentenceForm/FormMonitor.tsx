"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Hanzi } from "@/features/hanzi";
import { PinyinBadge } from "@/features/pinyin";
import { Dispatch, SetStateAction } from "react";

const FormMonitor = ({
  index,
  form,
  hanzis,
  selectedHanziId,
  setSelectedHanziIds,
}: {
  index: number;
  form: string;
  hanzis: Hanzi[];
  selectedHanziId: string;
  setSelectedHanziIds: Dispatch<SetStateAction<string[]>>;
}) => {
  const handleValueChange = (value: string) => {
    setSelectedHanziIds((prev) => {
      prev.splice(index, 1, value);
      return [...prev];
    });
  };
  return (
    <div className="grid grid-cols-[40px,1fr] items-center gap-4">
      <div className="grid aspect-square w-10 place-items-center rounded bg-white">
        {form}
      </div>
      <RadioGroup value={selectedHanziId} onValueChange={handleValueChange}>
        <div className="space-y-2">
          {hanzis.map((hanzi) => (
            <div key={hanzi.id} className="flex items-center gap-2">
              <RadioGroupItem value={hanzi.id} />
              <div>{hanzi.form}</div>
              <PinyinBadge pinyin={hanzi.pinyin} />
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default FormMonitor;
