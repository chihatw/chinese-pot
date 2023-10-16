"server only";

import ServerActionPendingButton from "@/components/ServerActionPendingButton";
import { SentenceTable } from "@/features/sentence";
import { getArticlesByIds, getSentencesByIds } from "@/firebase/restapi";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

const ArticlePage = async ({ params: { id } }: { params: { id: string } }) => {
  const { articles, readTime } = await getArticlesByIds([id]);
  const article = articles.at(0);
  if (!article) {
    redirect("/article/list");
  }
  const { sentences } = await getSentencesByIds(article.sentenceIds);

  const handleSubmit = async () => {
    "use server";
    revalidatePath(`/article/${id}`);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4 pb-40 pt-10">
      <div className="text-2xl font-bold">{article.title}</div>
      <div>{new Date(article.createdAt).toLocaleDateString("ja-JP")}</div>
      <div className="flex items-center justify-between">
        <form action={handleSubmit}>
          <ServerActionPendingButton label="Revalidate" />
        </form>
        <div className="text-xs font-extralight">{`fetched at ${
          new Date(readTime)
            .toLocaleString("ja-JP", {
              timeZone: "Asia/Tokyo",
            })
            .split(" ")[1]
        }`}</div>
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
