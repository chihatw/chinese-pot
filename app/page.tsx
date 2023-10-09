"server only";

import { FORM_SEARCH_KEY } from "@/features/invertedIndex/constants";

import { BatchAddArticlesButton } from "@/features/article";
import { BatchAddHanzisButton } from "@/features/hanzi";
import {
  BuildInvetedIndexesButton,
  SearchResultList,
  SearchSentencesByForms,
} from "@/features/invertedIndex";
import {
  BatchAddSentencesButton,
  getSentencesByForms,
} from "@/features/sentence";
import { REVALIDATE_TAGS } from "@/firebase/constants";
import { getDocumentCount } from "@/firebase/restapi";

import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default async function Home({
  searchParams,
}: {
  searchParams: { [FORM_SEARCH_KEY]?: string };
}) {
  const forms = searchParams[FORM_SEARCH_KEY]?.trim() || "";

  const hanzisCount = await getDocumentCount("hanzis", REVALIDATE_TAGS.hanzis);
  const articlesCount = await getDocumentCount(
    "articles",
    REVALIDATE_TAGS.articles,
  );
  const sentencesCount = await getDocumentCount(
    "sentences",
    REVALIDATE_TAGS.senences,
  );
  const invertedIndexesCount = await getDocumentCount(
    "invertedIndexes",
    REVALIDATE_TAGS.invertedIndexes,
  );

  const { total, sentences } = await getSentencesByForms(forms);

  return (
    <main className="mx-[10vw] w-[calc(100%-20vw)] space-y-10 pt-10 sm:mx-auto sm:w-[min(500px,100%-120px)]">
      <div className="space-y-1">
        {!hanzisCount ? <BatchAddHanzisButton /> : null}
        {!articlesCount ? <BatchAddArticlesButton /> : null}
        {!sentencesCount ? <BatchAddSentencesButton /> : null}
        {!invertedIndexesCount ? <BuildInvetedIndexesButton /> : null}
      </div>
      <div>
        <pre
          className={cn(
            "text-xs font-extralight leading-4 tracking-wider text-black/60",
            fontSans.className,
          )}
        >
          {JSON.stringify(
            {
              hanzisCount,
              articlesCount,
              sentencesCount,
              invertedIndexesCount,
            },
            null,
            4,
          )}
        </pre>
      </div>
      <SearchSentencesByForms forms={forms} />
      <SearchResultList forms={forms} total={total} sentences={sentences} />
    </main>
  );
}
