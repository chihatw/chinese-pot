import RevalidatePane from "@/components/RevalidatePane";
import { SentenceTable } from "@/features/sentence";
import { getArticlesByIds, getSentencesByIds } from "@/firebase/restapi";
import Link from "next/link";
import { redirect } from "next/navigation";

const ArticlePage = async ({ params: { id } }: { params: { id: string } }) => {
  const { articles, readTime } = await getArticlesByIds([id]);
  const article = articles.at(0);
  if (!article) {
    redirect("/article/list");
  }
  const { sentences } = await getSentencesByIds(article.sentenceIds);

  return (
    <div className="mx-auto w-full max-w-md space-y-4 pb-40 pt-10">
      <div className="text-2xl font-bold">{article.title}</div>
      <div>{new Date(article.createdAt).toLocaleDateString("ja-JP")}</div>
      <RevalidatePane readTime={readTime} pathname={`/article/${article.id}`} />
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
