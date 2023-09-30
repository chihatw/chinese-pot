"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { HANZIS } from "..";
import { batchAddHanzisAction } from "../services/actions";

const BatchAddHanzisButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await batchAddHanzisAction(HANZIS);
    setIsLoading(false);
    toast({ description: `added ${HANZIS.length} hanzis` });
  };

  return (
    <form action={handleSubmit}>
      <Button type="submit" disabled={isLoading}>
        <div className="flex items-center gap-2">
          {`Add Hanizis (${HANZIS.length})`}
          {isLoading ? <Loader2 className="animate-spin" /> : null}
        </div>
      </Button>
    </form>
  );
};

export default BatchAddHanzisButton;
