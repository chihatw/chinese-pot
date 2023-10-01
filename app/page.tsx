"server only";

import { getArticleCount } from "@/features/article/services/firebase";
import { getHanzisCount } from "@/features/hanzi/services/firestore";
import BatchAddHanzisButton from "@/features/hanziSeeds/components/BatchAddHanzisButton";
import { getInvertedIndexesCount } from "@/features/invertedIndex/services/firebase";
import { BuildInvetedIndexesButton } from "@/features/invertedIndexSeed";

import { getSentencesCount } from "@/features/sentence/services/firebase";
import {
  BatchAddArticlesButton,
  BatchAddSentenceUnigramsButton,
  BatchAddSentencesButton,
} from "@/features/sentenceSeeds";
import { FORM_SEARCH_KEY } from "@/features/sentenceUnigram/constants";
import {
  getSentenceUnigramsCount,
  getSentencesByForms,
} from "@/features/sentenceUnigram/services/firebase";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default async function Home({
  searchParams,
}: {
  searchParams: { [FORM_SEARCH_KEY]?: string };
}) {
  const form = searchParams[FORM_SEARCH_KEY] || "";

  const hanzisCount = await getHanzisCount();
  const articlesCount = await getArticleCount();
  const sentencesCount = await getSentencesCount();
  const sentenceUnigramsCount = await getSentenceUnigramsCount();
  const invertedIndexesCount = await getInvertedIndexesCount();

  const sentences = await getSentencesByForms(form);
  return (
    <main className="mx-[10vw] w-[calc(100%-20vw)] space-y-8 py-28 sm:mx-auto sm:w-[min(500px,100%-120px)]">
      <div className="rounded bg-yellow-100 bg-opacity-40 p-5">
        <span className="pr-2">🔥</span>Build Inverted Indexes
      </div>

      <div className="space-y-1">
        {!hanzisCount ? <BatchAddHanzisButton /> : null}
        {!articlesCount ? <BatchAddArticlesButton /> : null}
        {!sentencesCount ? <BatchAddSentencesButton /> : null}
        {!sentenceUnigramsCount ? <BatchAddSentenceUnigramsButton /> : null}
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
              sentenceUnigramsCount,
            },
            null,
            4,
          )}
        </pre>
      </div>

      {/* <SearchSentencesByForms form={form} sentences={sentences} /> */}

      {/* <HanziList /> */}
      {/* <PinyinList /> */}
      {/* <RandomArticleSentences /> */}
    </main>
  );
}
