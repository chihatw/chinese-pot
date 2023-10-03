"server only";

import { SimpleSentenceMonitor } from "@/features/sentence";
import { getSentencesByIds } from "@/features/sentence/services/firebase";
import { serverClient } from "@/trpc/serverClient";

/**
 * - trpc を通す練習。
 *
 * - firestoreで 型付けをしているので、実際は直接 getArticle すればよい。
 *
 * - たぶん、server side のキャッシュは zustand や react query を導入するのではなく、ユーザー操作と無関係に、設計で重複取得をやめるべき
 */
const ArticleSentences = async ({ articleId }: { articleId: string }) => {
  const article = await serverClient.getArticle_deprecated(articleId);
  if (!article) return null;

  const sentences = await getSentencesByIds(article.sentenceIds);

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
