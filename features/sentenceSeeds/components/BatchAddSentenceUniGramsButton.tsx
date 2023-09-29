"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

import { SENTENCE_UNIGRAMS } from "..";

const i = 0;
const set = 12000; // max 12000

const BatchAddSentenceUnigramsButton = ({ count }: { count: number }) => {
  const { toast } = useToast(); // "use client" 必須
  const start = set * i;
  const length = set * (i + 1);
  const subSet = SENTENCE_UNIGRAMS.slice(start, length);

  const handleSubmit = () => {
    //
    toast({ description: `added ${subSet.length} sentence unigrams` });
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
              >{`Batch Add Sentence Unigrams (${subSet.length})`}</Button>
            </TooltipTrigger>
            <TooltipContent className="rounded  p-2 shadow">
              <p>{`total: ${SENTENCE_UNIGRAMS.length}`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </div>
  );
};

export default BatchAddSentenceUnigramsButton;
