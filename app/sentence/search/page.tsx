import {
  SearchResultList,
  SearchSentencesByForms,
} from "@/features/invertedIndex";
import { FORM_SEARCH_KEY } from "@/features/invertedIndex/constants";
import {
  getArticlesBySentenceIds,
  getSentencesByForms,
} from "@/firebase/restapi";

const SentenceSearchPage = async ({
  searchParams,
}: {
  searchParams: { [FORM_SEARCH_KEY]?: string };
}) => {
  const forms = searchParams[FORM_SEARCH_KEY]?.trim() || "";

  const { total, sentences } = await getSentencesByForms(forms);

  const articles = await getArticlesBySentenceIds(sentences.map((s) => s.id));

  return (
    <div className="mx-auto w-full max-w-md pb-40 pt-10">
      <SearchSentencesByForms forms={forms} />
      <SearchResultList
        forms={forms}
        total={total}
        sentences={sentences}
        articles={articles}
      />
    </div>
  );
};

export default SentenceSearchPage;
