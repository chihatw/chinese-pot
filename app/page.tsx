"server only";

import { getArticleCount } from "@/features/article";
import { getHanzisCount } from "@/features/hanzi";
import BatchAddHanzisButton from "@/features/hanziSeeds/components/BatchAddHanzisButton";
import {
  FORM_SEARCH_KEY,
  SearchResultList,
  SearchSentencesByForms,
  getInvertedIndexesCount,
} from "@/features/invertedIndex";
import { BuildInvetedIndexesButton } from "@/features/invertedIndexSeed";
import { getSentencesByForms, getSentencesCount } from "@/features/sentence";

import {
  BatchAddArticlesButton,
  BatchAddSentencesButton,
} from "@/features/sentenceSeeds";

import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default async function Home({
  searchParams,
}: {
  searchParams: { [FORM_SEARCH_KEY]?: string };
}) {
  const forms = searchParams[FORM_SEARCH_KEY]?.trim() || "";

  const hanzisCount = await getHanzisCount();
  const articlesCount = await getArticleCount();
  const sentencesCount = await getSentencesCount();
  const invertedIndexesCount = await getInvertedIndexesCount();

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
      {/* <PinyinList /> */}
      {/* <RandomArticleSentences /> */}
    </main>
  );
}
