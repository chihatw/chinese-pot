"server only";
import LinkButton from "@/components/LinkButton";
import { getHanzisByForms } from "@/features/hanzi/services/firebase";
import { SentenceForm } from "@/features/sentence";
import { SENTENCE_FORM_KEY } from "@/features/sentence/constants";

const SentenceFormPage = async ({
  searchParams,
}: {
  searchParams: { [SENTENCE_FORM_KEY]?: string };
}) => {
  const forms = searchParams[SENTENCE_FORM_KEY]?.trim() || "";
  const forms_uniq = [...new Set(forms.split("").filter(Boolean))];

  // forms に含まれる Hanzi を一度で取得
  const hanzis = forms_uniq.length ? await getHanzisByForms(forms_uniq) : [];

  return (
    <div className="mx-auto w-full max-w-md space-y-10 pt-10">
      <LinkButton href="/">Back to Home</LinkButton>
      <SentenceForm forms={forms} hanzis={hanzis} />
    </div>
  );
};

export default SentenceFormPage;
