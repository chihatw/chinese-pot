"use client";

import { Hanzi } from "@/features/hanzi";
import { Sentence } from "@/features/sentence";
import { Dispatch, SetStateAction } from "react";
import HanziForm from "./HanziForm";
import SelectHanziRadioGroup from "./SelectHanziRadioGroup";

const FormMonitor = ({
  index,
  form,
  hanzis,
  sentences,
  selectedHanziId,
  setSelectedHanziIds,
}: {
  index: number;
  form: string;
  hanzis: Hanzi[];
  selectedHanziId: string;
  setSelectedHanziIds: Dispatch<SetStateAction<string[]>>;
  sentences: Sentence[];
}) => {
  return (
    <div className="grid grid-cols-[auto,1fr] items-center gap-4">
      <div>{form}</div>
      <div className="space-y-2">
        <SelectHanziRadioGroup
          form={form}
          index={index}
          selectedHanziId={selectedHanziId}
          setSelectedHanziIds={setSelectedHanziIds}
          sentences={sentences}
          hanzis={hanzis}
        />
        <HanziForm form={form} />
      </div>
    </div>
  );
};

export default FormMonitor;
