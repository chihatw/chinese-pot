"server only";

import { getArticle } from "@/features/article/services/firebase";
import { SentenceLine } from "@/features/sentence";
import { getSentencesByIds } from "@/features/sentence/services/firebase";
import { redirect } from "next/navigation";

const ArticlePage = async ({ params: { id } }: { params: { id: string } }) => {
  const article = await getArticle(id);
  if (!article) {
    redirect("/article/list");
  }

  const sentences = await getSentencesByIds(article.sentenceIds);

  return (
    <div className="mx-auto w-full max-w-md space-y-10 pt-10">
      <div className="text-2xl font-bold">{article.title}</div>
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
