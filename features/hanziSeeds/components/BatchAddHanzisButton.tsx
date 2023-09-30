"use client";

import ServerActionPendingButton from "@/components/ServerActionPendingButton";
import { useToast } from "@/components/ui/use-toast";
import { HANZIS } from "..";
import { batchAddHanzisAction } from "../services/actions";

const BatchAddHanzisButton = () => {
  const { toast } = useToast();

  const handleSubmit = async () => {
    await batchAddHanzisAction(HANZIS);
    toast({ description: `added ${HANZIS.length} hanzis` });
  };

  return (
    <form action={handleSubmit}>
      <ServerActionPendingButton label={`Add Hanizis (${HANZIS.length})`} />
    </form>
  );
};

export default BatchAddHanzisButton;
