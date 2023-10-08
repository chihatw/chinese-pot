"server only";

import { getArticle } from "@/features/article";
import { getSentencesByIds } from "@/features/sentence";
import SentenceTable from "@/features/sentence/components/SentenceTable";
import Link from "next/link";
import { redirect } from "next/navigation";

const ArticlePage = async ({ params: { id } }: { params: { id: string } }) => {
  const article = await getArticle(id);
  if (!article) {
    redirect("/article/list");
  }

  const sentences = await getSentencesByIds(article.sentenceIds);

  return (
    <div className="mx-auto w-full max-w-md space-y-4 pt-10">
      <div className="text-2xl font-bold">{article.title}</div>
      <div>{new Date(article.createdAt).toLocaleDateString("ja")}</div>
      <div className="flex">
        <Link href={`/article/${article.id}/form`}>
          <div className="rounded bg-primary px-4 py-2 text-white">
            Crete New Sentence
          </div>
        </Link>
      </div>
      <SentenceTable sentences={sentences} />
    </div>
  );
};

export default ArticlePage;
