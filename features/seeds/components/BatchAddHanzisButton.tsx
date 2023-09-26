"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { HANZIS } from "..";
import { batchAddHanzisAction } from "../services/actions";

const i = 0;

const set = 3000;

const BatchAddHanzisButton = () => {
  const { toast } = useToast();
  const start = set * i;
  const length = set * (i + 1);
  const subSet = HANZIS.slice(start, length);

  const handleSubmit = () => {
    console.log({ start, length, subSet });
    batchAddHanzisAction(subSet);
    toast({ description: `added ${subSet.length} hanzis` });
  };
  return (
    <form action={handleSubmit}>
      <Button type="submit">{`Batch Add ( ${subSet.length} )`}</Button>
    </form>
  );
};

export default BatchAddHanzisButton;
