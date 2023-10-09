"use client";

import { useToast } from "@/components/ui/use-toast";

import ServerActionPendingButton from "@/components/ServerActionPendingButton";

import SENTENCES_JSON from "../json/SENTENCES.json";
import { Sentence } from "../schema";
import { batchAddSentencesAction } from "../services/actions";

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
