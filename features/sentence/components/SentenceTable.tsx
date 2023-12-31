"use client";

import { deleteSentenceAction } from "@/app/_actions";
import ServerActionPendingIconButton from "@/components/ServerActionPendingIconButton";

import { Sentence, SentenceLine } from "@/features/sentence";
import { Delete } from "lucide-react";

const SentenceTable = ({
  sentences,
  articleId,
}: {
  sentences: Sentence[];
  articleId?: string;
}) => {
  const handleSubmit = async (sentenceId: string) => {
    const sentence = sentences.find((s) => s.id === sentenceId)!;
    await deleteSentenceAction(sentence, articleId);
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
        {sentences.map((sentence, index) => {
          if (!sentence) return null;
          return (
            <div
              key={sentence.id}
              className="grid grid-cols-[24px,1fr,auto] items-center gap-2"
            >
              <div className="text-xs">{index + 1}</div>
              <SentenceLine sentence={sentence} />
              <form action={() => handleSubmit(sentence.id)}>
                <ServerActionPendingIconButton variant="ghost">
                  <Delete />
                </ServerActionPendingIconButton>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SentenceTable;
