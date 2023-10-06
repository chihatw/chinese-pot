"server only";

import { getArticle } from "@/features/article/services/firebase";
import { SentenceLine } from "@/features/sentence";
import { getSentencesByIds } from "@/features/sentence/services/firebase";
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
      <div className="space-y-2">
        {sentences.map((sentence, index) => (
          <div
            key={sentence.id}
            className="grid grid-cols-[20px,1fr] items-center"
          >
            <div>{index + 1}</div>
            <SentenceLine sentence={sentence} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;
