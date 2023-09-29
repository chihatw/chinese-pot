"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

import { SENTENCES } from "..";
import { batchAddSentencesAction } from "../services/actions";

const i = 0;
const set = 2000; // max 2000

const BatchAddSentencesButton = ({ count }: { count: number }) => {
  const { toast } = useToast(); // "use client" 必須

  const start = set * i;
  const length = set * (i + 1);
  const subSet = SENTENCES.slice(start, length);

  const handleSubmit = () => {
    batchAddSentencesAction(subSet);
    toast({
      description: `added ${subSet.length} sentences`,
    });
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
              >{`Add Sentences (${subSet.length})`}</Button>
            </TooltipTrigger>
            <TooltipContent className="rounded  p-2  shadow">
              <p>{`total: ${SENTENCES.length}`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </div>
  );
};

export default BatchAddSentencesButton;
