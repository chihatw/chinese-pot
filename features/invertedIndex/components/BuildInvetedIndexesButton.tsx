"use client";
import ServerActionPendingButton from "@/components/ServerActionPendingButton";
import { useToast } from "@/components/ui/use-toast";

import { batchAddInvertedIndexesAction } from "@/app/_actions";
import INVERTED_INDEXES_JSON from "../json/inverted_indexes.json";
import { InvertedIndex } from "../schema";

const invertedIndexes = INVERTED_INDEXES_JSON as InvertedIndex[];

const BuildInvetedIndexesButton = () => {
  const { toast } = useToast();

  const handleSubmit = async () => {
    await batchAddInvertedIndexesAction(invertedIndexes);
    toast({
      description: `added ${invertedIndexes.length} inverted indexes.`,
    });
  };
  return (
    <form action={handleSubmit}>
      <ServerActionPendingButton
        label={`Build Inverted Indexes (${invertedIndexes.length})`}
      />
    </form>
  );
};

export default BuildInvetedIndexesButton;
