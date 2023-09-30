"use client";

import { useToast } from "@/components/ui/use-toast";
import { SENTENCE_UNIGRAM_COUNT_MAX } from "@/features/sentenceUnigram/constants";
import { SENTENCE_UNIGRAMS } from "..";
import ServerActionPendingButton from "../../../components/ServerActionPendingButton";
import { batchAddSentenceUnigramsAction } from "../services/actions";

const BatchAddSentenceUnigramsButton = () => {
  const sentenceUnigrams = SENTENCE_UNIGRAMS;

  const { toast } = useToast(); // "use client" 必須

  const handleSubmit = async () => {
    // Server Action を呼ぶ時に
    // request body が 1mb を超えるとエラーになるので、小分けにする
    for (
      let i = 0;
      i < sentenceUnigrams.length;
      i += SENTENCE_UNIGRAM_COUNT_MAX
    ) {
      const subSet = sentenceUnigrams.slice(i, i + SENTENCE_UNIGRAM_COUNT_MAX);
      const isLast = i + SENTENCE_UNIGRAM_COUNT_MAX >= sentenceUnigrams.length;
      await batchAddSentenceUnigramsAction(subSet, isLast);
    }
    toast({
      description: `added ${sentenceUnigrams.length} sentence unigrams`,
    });
  };

  return (
    <form action={handleSubmit}>
      <ServerActionPendingButton
        label={`Batch Add Sentence Unigrams (${sentenceUnigrams.length})`}
      />
    </form>
  );
};

export default BatchAddSentenceUnigramsButton;
