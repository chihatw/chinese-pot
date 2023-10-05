"use client";

import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { Sentence, SentenceLine } from "..";
import { removeSentenceAction } from "../services/actions";
import { buildHanzisFromSentence } from "../services/utils";

const SentenceTable = ({ sentences }: { sentences: Sentence[] }) => {
  const handleSubmit = async (sentenceId: string) => {
    const sentence = sentences.find((s) => s.id === sentenceId)!;
    const hanzis = buildHanzisFromSentence(sentence);
    await removeSentenceAction(sentence, hanzis);
  };
  return (
    <div className="space-y-2 pt-10">
      {sentences.map((sentence) => (
        <div
          key={sentence.id}
          className="grid grid-cols-[60px,1fr,auto] items-center gap-2"
        >
          <div className="text-xs">
            {new Date(sentence.createdAt).toLocaleDateString("ja")}
          </div>
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
