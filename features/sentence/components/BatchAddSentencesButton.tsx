"use client";

import { batchAddSentencesAction } from "@/app/_actions";
import ServerActionPendingButton from "@/components/ServerActionPendingButton";
import { useToast } from "@/components/ui/use-toast";
import { Sentence } from "@/features/sentence";
import SENTENCES_JSON from "../json/SENTENCES.json";

const SENTENCES = SENTENCES_JSON as Sentence[];

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
