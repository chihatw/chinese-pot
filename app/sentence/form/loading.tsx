"server only";

import { SentenceTable } from "@/features/sentence";
import { SentenceForm } from "@/features/sentenceForm";

const Loading = async () => {
  return (
    <div className="mx-auto w-full max-w-md  space-y-10 pb-40 pt-10">
      <div className="text-4xl font-bold">Sentence Form</div>
      <SentenceForm forms={""} hanzis={[]} hanziSentences={[]} total={0} />
      <div className="text-2xl font-bold">Recent Sentences</div>
      <SentenceTable sentences={[]} />
    </div>
  );
};

export default Loading;
