"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Sentence,
  SentenceLine,
  buildHanzisFromSentence,
  removeSentenceAction,
} from "@/features/sentence";
import { Delete } from "lucide-react";

const SentenceTable = ({
  sentences,
  articleId,
}: {
  sentences: Sentence[];
  articleId?: string;
}) => {
  const { toast } = useToast();
  const handleSubmit = async (sentenceId: string) => {
    const sentence = sentences.find((s) => s.id === sentenceId)!;
    const hanzis = buildHanzisFromSentence(sentence);
    await removeSentenceAction(sentence, hanzis, articleId);
    toast({ description: "deleted sentence" });
  };
  return (
    <div>
      {articleId ? (
        <div className="-mt-12 pb-8">
          <div className="text-right text-xs text-gray-500">articleId:</div>
          <div className="text-right text-xs font-bold text-gray-500">
            {articleId}
          </div>
        </div>
      ) : null}
      <div className="space-y-4 ">
        {sentences.map((sentence, index) => (
          <div
            key={sentence.id}
            className="grid grid-cols-[24px,1fr,auto] items-center gap-2"
          >
            <div className="text-xs">{index + 1}</div>
            <SentenceLine sentence={sentence} />
            <form action={() => handleSubmit(sentence.id)}>
              <Button variant="ghost" type="submit">
                <Delete />
              </Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentenceTable;
