"server only";

import { SentenceTable } from "@/features/sentence";
import { SentenceForm, buildSentenceFormProps } from "@/features/sentenceForm";
import { SENTENCE_FORM_KEY } from "@/features/sentenceForm/constants";
import { getRecentSentences } from "@/firebase/restapi";

const SentenceFormPage = async ({
  searchParams,
}: {
  searchParams: { [SENTENCE_FORM_KEY]?: string };
}) => {
  const forms = searchParams[SENTENCE_FORM_KEY]?.trim() || "";
  const { hanzis, sentences } = await buildSentenceFormProps(forms);

  const recentSentences = await getRecentSentences(5);

  return (
    <div className="mx-auto w-full max-w-md  space-y-10 pb-40 pt-10">
      <div className="text-4xl font-bold">Sentence Form</div>
      <SentenceForm
        forms={forms}
        hanzis={hanzis}
        sentences={sentences}
        total={sentences.length}
      />
      <div className="text-2xl font-bold">Recent Sentences</div>
      <SentenceTable sentences={recentSentences} />
    </div>
  );
};

export default SentenceFormPage;
