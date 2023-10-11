"server only";

import { SentenceForm } from "@/features/sentenceForm";
import Link from "next/link";

const Loading = async () => {
  return (
    <div className="mx-auto w-full max-w-md space-y-8 pb-40 pt-10">
      <div className="text-2xl font-bold">{""}</div>
      <div className="flex">
        <Link href={`/article/${""}`}>
          <div className="rounded bg-primary px-4 py-2 text-white">
            Back to Article
          </div>
        </Link>
      </div>
      <SentenceForm
        articleId={""}
        forms={""}
        hanzis={[]}
        sentences={[]}
        total={0}
      />
    </div>
  );
};

export default Loading;
