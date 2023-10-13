"server only";

import { SimpleSentenceMonitor } from "@/features/sentence";
import { getArticlesByIds, getSentencesByIds } from "@/firebase/restapi";

const ArticleSentences = async ({ articleId }: { articleId: string }) => {
  const { articles } = await getArticlesByIds([articleId]);
  const article = articles.at(0);
  if (!article) return null;

  const { sentences } = await getSentencesByIds(article.sentenceIds);

  return (
    <div key={article.id} className="space-y-4 rounded bg-white p-5">
      <div className=" text-gray-500">{`${new Date(
        article.createdAt,
      ).toLocaleDateString("ja")}`}</div>
      <div className="text-lg font-bold">{article.title}</div>
      {sentences.map((sentence) => {
        return <SimpleSentenceMonitor key={sentence.id} sentence={sentence} />;
      })}
    </div>
  );
};

export default ArticleSentences;
