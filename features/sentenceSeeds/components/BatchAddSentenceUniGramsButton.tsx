"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { SENTENCE_UNIGRAM_COUNT_MAX } from "@/features/sentenceUnigram/constants";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SENTENCE_UNIGRAMS } from "..";
import { batchAddSentenceUnigramsAction } from "../services/actions";

const BatchAddSentenceUnigramsButton = () => {
  const { toast } = useToast(); // "use client" 必須

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Server Action を呼ぶ時に
    // request body が 1mb を超えるとエラーになるので、小分けにする
    setIsLoading(true);
    for (
      let i = 0;
      i < SENTENCE_UNIGRAMS.length;
      i += SENTENCE_UNIGRAM_COUNT_MAX
    ) {
      const subSet = SENTENCE_UNIGRAMS.slice(i, i + SENTENCE_UNIGRAM_COUNT_MAX);
      const isLast = SENTENCE_UNIGRAM_COUNT_MAX * i >= SENTENCE_UNIGRAMS.length;
      await batchAddSentenceUnigramsAction(subSet, isLast);
    }
    setIsLoading(false);
    toast({
      description: `added ${SENTENCE_UNIGRAMS.length} sentence unigrams`,
    });
  };

  return (
    <form action={handleSubmit}>
      <Button type="submit" disabled={isLoading}>
        <div className="flex items-center gap-2">
          {`Batch Add Sentence Unigrams (${SENTENCE_UNIGRAMS.length})`}
          {isLoading ? <Loader2 className="animate-spin" /> : null}
        </div>
      </Button>
    </form>
  );
};

export default BatchAddSentenceUnigramsButton;
