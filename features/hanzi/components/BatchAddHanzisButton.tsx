"use client";

import ServerActionPendingButton from "@/components/ServerActionPendingButton";
import { useToast } from "@/components/ui/use-toast";

import HANZIS_JSON from "../json/hanzis.json";
import { Hanzi } from "../schema";
import { batchAddHanzisAction } from "../services/actions";

const hanzis = HANZIS_JSON as Hanzi[];

const BatchAddHanzisButton = () => {
  const { toast } = useToast();

  const handleSubmit = async () => {
    await batchAddHanzisAction(hanzis);
    toast({ description: `added ${hanzis.length} hanzis` });
  };

  return (
    <form action={handleSubmit}>
      <ServerActionPendingButton label={`Add Hanizis (${hanzis.length})`} />
    </form>
  );
};

export default BatchAddHanzisButton;
