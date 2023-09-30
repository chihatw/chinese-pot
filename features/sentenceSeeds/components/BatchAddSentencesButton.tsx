"use client";

import { useToast } from "@/components/ui/use-toast";

import { SENTENCES } from "..";
import ServerActionPendingButton from "../../../components/ServerActionPendingButton";
import { batchAddSentencesAction } from "../services/actions";

const BatchAddSentencesButton = () => {
  const { toast } = useToast();

  const handleSubmit = async () => {
    await batchAddSentencesAction(SENTENCES);
    toast({
      description: `added ${SENTENCES.length} sentences`,
    });
  };

  return (
    <form action={handleSubmit}>
      <ServerActionPendingButton
        label={`Add Sentences (${SENTENCES.length})`}
      />
    </form>
  );
};

export default BatchAddSentencesButton;
