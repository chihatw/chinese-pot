"server only";

import { RandomArticleSentences } from "@/features/article";
import { getArticleCount } from "@/features/article/services/firebase";
import { getHanzisCount } from "@/features/hanzi/services/firestore";
import BatchAddHanzisButton from "@/features/hanziSeeds/components/BatchAddHanzisButton";
import { getSentencesCount } from "@/features/sentence/services/firebase";
import {
  BatchAddArticlesButton,
  BatchAddSentenceUnigramsButton,
  BatchAddSentencesButton,
} from "@/features/sentenceSeeds";
import { SentenceSearchByOneform } from "@/features/sentenceUnigram";
import { FORM_SEARCH_KEY } from "@/features/sentenceUnigram/constants";
import {
  getSentenceUnigramsCount,
  getSentencesByOneForm,
} from "@/features/sentenceUnigram/services/firebase";

export default async function Home({
  searchParams,
}: {
  searchParams: { [FORM_SEARCH_KEY]?: string };
}) {
  const form = searchParams[FORM_SEARCH_KEY] || "";
  const sentences = await getSentencesByOneForm(form.at(0) || "");

  const hanzisCount = await getHanzisCount();
  const articlesCount = await getArticleCount();
  const sentencesCount = await getSentencesCount();
  const sentenceUnigramsCount = await getSentenceUnigramsCount();
  return (
    <main className="mx-[10vw] w-[calc(100%-20vw)] space-y-8 py-28 sm:mx-auto sm:w-[min(500px,100%-120px)]">
      <div className="rounded bg-yellow-100 bg-opacity-40 p-5">
        <span className="pr-2">🔥</span>Unigram Search
      </div>
      <SentenceSearchByOneform form={form} sentences={sentences} />
      <div className="space-y-1">
        {!hanzisCount ? <BatchAddHanzisButton /> : null}
        {!articlesCount ? <BatchAddArticlesButton /> : null}
        {!sentencesCount ? <BatchAddSentencesButton /> : null}
        {!sentenceUnigramsCount ? <BatchAddSentenceUnigramsButton /> : null}
      </div>
      {/* <HanziList /> */}
      {/* <PinyinList /> */}
      <RandomArticleSentences />
    </main>
  );
}
