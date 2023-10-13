"server only";

import { Button } from "@/components/ui/button";
import SentenceTable from "@/features/sentence/components/SentenceTable";
import { getArticlesByIds, getSentencesByIds } from "@/firebase/restapi";
import { RefreshCcw } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

const ArticlePage = async ({ params: { id } }: { params: { id: string } }) => {
  const articles = await getArticlesByIds([id]);
  const article = articles.at(0);
  if (!article) {
    redirect("/article/list");
  }
  const { sentences } = await getSentencesByIds(article.sentenceIds);

  const handleSubmit = async () => {
    "use server";
    revalidatePath(`/article/${id}`);
    redirect(`/article/${id}?${Math.random()}`);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4 pb-40 pt-10">
      <div className="text-2xl font-bold">{article.title}</div>
      <div>{new Date(article.createdAt).toLocaleDateString("ja")}</div>
      <div className="flex">
        <form action={handleSubmit}>
          <Button className="flex gap-2" type="submit">
            <span>Revalidate</span>
            <RefreshCcw />
          </Button>
        </form>
      </div>
      <div className="flex">
        <Link href={`/article/${article.id}/form`}>
          <div className="rounded-lg bg-primary px-4 py-1.5 text-white">
            Create New Sentence
          </div>
        </Link>
      </div>
      <SentenceTable
        sentences={article.sentenceIds.map(
          (id) => sentences.find((s) => s.id === id)!,
        )}
        articleId={article.id}
      />
    </div>
  );
};

export default ArticlePage;
