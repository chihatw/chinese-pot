"server only";

import { ArticleForm, getArticle } from "@/features/article";

const ArticleFormPage = async ({
  searchParams: { id },
}: {
  searchParams: { id?: string };
}) => {
  let article = undefined;
  if (id) {
    article = await getArticle(id);
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-10 pt-10">
      <div className="text-4xl font-extrabold">Article Form</div>
      <ArticleForm article={article} />
    </div>
  );
};

export default ArticleFormPage;
