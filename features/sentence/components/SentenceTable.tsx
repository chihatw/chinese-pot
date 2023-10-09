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

const SentenceTable = ({ sentences }: { sentences: Sentence[] }) => {
  const { toast } = useToast();
  const handleSubmit = async (sentenceId: string) => {
    const sentence = sentences.find((s) => s.id === sentenceId)!;
    const hanzis = buildHanzisFromSentence(sentence);
    await removeSentenceAction(sentence, hanzis);
    toast({ description: "deleted sentence" });
  };
  return (
    <div className="space-y-2 pt-10">
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
  );
};

export default SentenceTable;
