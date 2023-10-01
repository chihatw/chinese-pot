"use client";
import ServerActionPendingButton from "@/components/ServerActionPendingButton";
import { useToast } from "@/components/ui/use-toast";
import { INVERTED_INDEXES } from "..";
import { batchAddInvertedIndexesAction } from "../services/actions";

const BuildInvetedIndexesButton = () => {
  const { toast } = useToast();
  const invertedIndexes = INVERTED_INDEXES;

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
