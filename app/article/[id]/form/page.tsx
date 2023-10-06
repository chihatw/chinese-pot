"server only";

import { getArticle } from "@/features/article";
import Link from "next/link";
import { redirect } from "next/navigation";

const ArticleSentenceFormPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  !id && redirect("/");

  const article = await getArticle(id);
  !article && redirect("/");

  return (
    <div className="mx-auto w-full max-w-md space-y-8 pt-10">
      <div className="text-2xl font-bold">{article!.title}</div>
      <div className="flex">
        <Link href={`/article/${id}`}>
          <div className="rounded bg-primary px-4 py-2 text-white">
            Back to Article
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ArticleSentenceFormPage;
