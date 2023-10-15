"use client";

import { Hanzi } from "@/features/hanzi";
import { Sentence } from "@/features/sentence";
import { SentenceForm } from "@/features/sentenceForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useArticleSentences } from "./ArticleSentencesContextProvider";

const ArticleSentenceForm = ({
  forms,
  hanzis,
  sentences,
}: {
  forms: string;
  hanzis: Hanzi[];
  sentences: Sentence[];
}) => {
  const router = useRouter();
  const { optimisticValue } = useArticleSentences();
  if (!optimisticValue.article) {
    router.push("/article/list");
    return;
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-8 pb-40 pt-10">
      <div className="text-2xl font-bold">{optimisticValue.article.title}</div>
      <div className="flex">
        <Link href={`/article/${optimisticValue.article.id}`}>
          <div className="rounded bg-primary px-4 py-2 text-white">
            Back to Article
          </div>
        </Link>
      </div>
      <SentenceForm
        articleId={optimisticValue.article.id}
        forms={forms}
        hanzis={hanzis}
        sentences={sentences}
        total={sentences.length}
      />
    </div>
  );
};

export default ArticleSentenceForm;
