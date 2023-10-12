import {
  SearchResultList,
  SearchSentencesByForms,
} from "@/features/invertedIndex";
import { FORM_SEARCH_KEY } from "@/features/invertedIndex/constants";
import { getSentencesByForms } from "@/firebase/restapi";

const SentenceSearchPage = async ({
  searchParams,
}: {
  searchParams: { [FORM_SEARCH_KEY]?: string };
}) => {
  const forms = searchParams[FORM_SEARCH_KEY]?.trim() || "";

  const { total, sentences } = await getSentencesByForms(forms);

  return (
    <div className="mx-auto w-full max-w-md pt-10">
      <SearchSentencesByForms forms={forms} />
      <SearchResultList forms={forms} total={total} sentences={sentences} />
    </div>
  );
};

export default SentenceSearchPage;
