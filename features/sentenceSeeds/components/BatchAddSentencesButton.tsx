"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SENTENCES } from "..";
import { batchAddSentencesAction } from "../services/actions";

const BatchAddSentencesButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await batchAddSentencesAction(SENTENCES);
    setIsLoading(false);
    toast({
      description: `added ${SENTENCES.length} sentences`,
    });
  };

  return (
    <form action={handleSubmit}>
      <Button type="submit" disabled={isLoading}>
        <div className="flex items-center gap-2">
          {`Add Sentences (${SENTENCES.length})`}
          {isLoading ? <Loader2 className="animate-spin" /> : null}
        </div>
      </Button>
    </form>
  );
};

export default BatchAddSentencesButton;
