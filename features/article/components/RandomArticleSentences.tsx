"server only";
import { ARTICLES } from "@/features/sentenceSeeds";
import { ArticleSentences } from "..";

const RandomArticleSentences = async () => {
  const gotIndex = Math.floor(Math.random() * 200);
  const articleId = ARTICLES.map((a) => a.id).at(gotIndex);
  if (!articleId) return null;
  return (
    <div className="space-y-4 ">
      <div className="text-4xl font-bold">Random Article</div>
      <ArticleSentences articleId={articleId} />
    </div>
  );
};

export default RandomArticleSentences;
