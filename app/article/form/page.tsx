"server only";

import { ArticleForm } from "@/features/article";
import { getArticlesByIds } from "@/firebase/restapi";

const ArticleFormPage = async ({
  searchParams: { id },
}: {
  searchParams: { id?: string };
}) => {
  let article = undefined;
  if (id) {
    const { articles } = await getArticlesByIds([id]);
    article = articles.at(0);
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-10 pt-10">
      <div className="text-4xl font-extrabold">Article Form</div>
      <ArticleForm article={article} />
    </div>
  );
};

export default ArticleFormPage;
