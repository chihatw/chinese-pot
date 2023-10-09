"server only";

import { SentenceForm, buildSentenceFormProps } from "@/features/sentenceForm";
import { SENTENCE_FORM_KEY } from "@/features/sentenceForm/constants";

const SentenceFormPage = async ({
  searchParams,
}: {
  searchParams: { [SENTENCE_FORM_KEY]?: string };
}) => {
  const forms = searchParams[SENTENCE_FORM_KEY]?.trim() || "";
  const { hanzis, sentences } = await buildSentenceFormProps(forms);

  return (
    <div className="mx-auto w-full max-w-md  space-y-10 pb-40 pt-10">
      <div className="text-4xl font-bold">SentenceForm</div>
      <SentenceForm forms={forms} hanzis={hanzis} sentences={sentences} />
    </div>
  );
};

export default SentenceFormPage;
