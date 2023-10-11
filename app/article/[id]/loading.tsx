"server only";

import SentenceTable from "@/features/sentence/components/SentenceTable";
import Link from "next/link";

const ArticlePage = async () => {
  return (
    <div className="mx-auto w-full max-w-md space-y-4 pb-40 pt-10">
      <div className="text-2xl font-bold">{""}</div>
      <div>{new Date().toLocaleDateString("ja")}</div>
      <div className="flex">
        <Link href={`/article/${""}/form`}>
          <div className="rounded bg-primary px-4 py-2 text-white">
            Create New Sentence
          </div>
        </Link>
      </div>
      <SentenceTable sentences={[]} articleId={""} />
    </div>
  );
};

export default ArticlePage;
