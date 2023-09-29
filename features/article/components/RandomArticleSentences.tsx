import { ARTICLES } from "@/features/sentenceSeeds";
import { ArticleSentences } from "..";

const RandomArticleSentences = () => {
  const gotIndex = Math.floor(Math.random() * 200);
  const article = ARTICLES.at(gotIndex);
  if (!article) return;
  return (
    <div className="space-y-4 ">
      <div className="text-4xl font-bold">Random Article</div>
      <ArticleSentences articleId={article.id} />
    </div>
  );
};

export default RandomArticleSentences;
