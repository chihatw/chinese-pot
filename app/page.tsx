"server only";

import { RandomArticleSentences } from "@/features/article";
import { SentenceSearchByOneform } from "@/features/sentenceUnigram";

export default async function Home() {
  // const hanzisCount = await getHanzisCount();
  // const articlesCount = await getArticleCount();
  // const sentencesCount = await getSentencesCount();
  // const sentenceUnigramsCount = await getSentenceUnigramsCount();
  return (
    <main className="mx-[10vw] w-[calc(100%-20vw)] space-y-8 py-28 sm:mx-auto sm:w-[min(500px,100%-120px)]">
      <div className="rounded bg-yellow-100 bg-opacity-40 p-5">
        <span className="pr-2">🔥</span>Unigram Search
      </div>
      <SentenceSearchByOneform />
      {/* <div className="space-y-1">
        <BatchAddHanzisButton count={hanzisCount} />
        <BatchAddArticlesButton count={articlesCount} />
        <BatchAddSentencesButton count={sentencesCount} />
        <BatchAddSentenceUnigramsButton count={sentenceUnigramsCount} />
      </div> */}
      {/* <HanziList /> */}
      {/* <PinyinList /> */}
      <RandomArticleSentences />
    </main>
  );
}
