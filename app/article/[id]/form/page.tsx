"server only";

import ArticleSentenceForm from "@/features/articleSentences/components/ArticleSentenceForm";
import { buildSentence_from_props } from "@/features/sentenceForm";
import { SENTENCE_FORM_KEY } from "@/features/sentenceForm/constants";
import { redirect } from "next/navigation";

const ArticleSentenceFormPage = async ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [SENTENCE_FORM_KEY]?: string };
}) => {
  !id && redirect("/");
  const forms = searchParams[SENTENCE_FORM_KEY]?.trim() || "";
  const { hanzis, sentences } = await buildSentence_from_props(forms);

  return (
    <ArticleSentenceForm forms={forms} hanzis={hanzis} sentences={sentences} />
  );
};

export default ArticleSentenceFormPage;
