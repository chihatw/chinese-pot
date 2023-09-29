"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { HANZIS } from "..";
import { batchAddHanzisAction } from "../services/actions";

const i = 0;
const set = 3000;

const BatchAddHanzisButton = ({ count }: { count: number }) => {
  const { toast } = useToast(); // "use client" 必須
  const start = set * i;
  const length = set * (i + 1);
  const subSet = HANZIS.slice(start, length);

  const handleSubmit = () => {
    batchAddHanzisAction(subSet);
    toast({ description: `added ${subSet.length} hanzis` });
  };
  return (
    <div>
      <div className="text-sm">{`count: ${count}`}</div>
      <form action={handleSubmit}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                disabled={!!count}
              >{`Add Hanizis (${subSet.length})`}</Button>
            </TooltipTrigger>
            <TooltipContent className="rounded  p-2 shadow">
              <p>{`total: ${HANZIS.length}`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </div>
  );
};

export default BatchAddHanzisButton;
