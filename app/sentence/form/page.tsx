"server only";

import { getHanzisByForms } from "@/features/hanzi";
import { SentenceForm, getSentencesByIds } from "@/features/sentence";
import { SENTENCE_FORM_KEY } from "@/features/sentence/constants";

const SentenceFormPage = async ({
  searchParams,
}: {
  searchParams: { [SENTENCE_FORM_KEY]?: string };
}) => {
  const forms = searchParams[SENTENCE_FORM_KEY]?.trim() || "";
  const forms_uniq = [...new Set(forms.split("").filter(Boolean))];

  // forms に含まれる Hanzi を取得
  const hanzis = forms_uniq.length ? await getHanzisByForms(forms_uniq) : [];
  const latestSentenceIds = [...new Set(hanzis.map((h) => h.latestSentenceId))];
  const sentences = await getSentencesByIds(latestSentenceIds);

  return (
    <div className="mx-auto w-full max-w-md  pt-10">
      <SentenceForm forms={forms} hanzis={hanzis} sentences={sentences} />
    </div>
  );
};

export default SentenceFormPage;
