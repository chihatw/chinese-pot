"server only";

import { SentenceForm, buildSentenceFormProps } from "@/features/sentenceForm";
import { SENTENCE_FORM_KEY } from "@/features/sentenceForm/constants";
import { getArticlesByIds } from "@/firebase/restapi";
import Link from "next/link";
import { redirect } from "next/navigation";

const ArticleSentenceFormPage = async ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [SENTENCE_FORM_KEY]?: string };
}) => {
  !id && redirect("/article/list");

  const { articles } = await getArticlesByIds([id]);
  const article = articles.at(0);

  if (!article) {
    redirect("/article/list");
  }

  const forms = searchParams[SENTENCE_FORM_KEY]?.trim() || "";
  const { hanzis, hanziSentences, total } = await buildSentenceFormProps(forms);

  return (
    <div className="mx-auto w-full max-w-md space-y-8 pb-40 pt-10">
      <div className="text-2xl font-bold">{article.title}</div>
      <div className="flex">
        <Link href={`/article/${article.id}`}>
          <div className="rounded bg-primary px-4 py-2 text-white">
            Back to Article
          </div>
        </Link>
      </div>
      <SentenceForm
        articleId={article.id}
        forms={forms}
        hanzis={hanzis}
        hanziSentences={hanziSentences}
        total={total}
      />
    </div>
  );
};

export default ArticleSentenceFormPage;
