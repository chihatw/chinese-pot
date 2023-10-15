"server only";

import ServerActionPendingButton from "@/components/ServerActionPendingButton";
import ArticleSentenceList from "@/features/articleSentences/components/ArticleSentenceList";
import { getArticlesByIds, getSentencesByIds } from "@/firebase/restapi";
import { revalidatePath } from "next/cache";
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
      <ArticleSentenceList article={article} sentences={sentences} />
    </div>
  );
};

export default ArticlePage;
