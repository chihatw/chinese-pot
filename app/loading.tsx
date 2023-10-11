"server only";

import { BatchAddArticlesButton } from "@/features/article";
import { BatchAddHanzisButton } from "@/features/hanzi";
import { BuildInvetedIndexesButton } from "@/features/invertedIndex";
import { BatchAddSentencesButton } from "@/features/sentence";
import { getDocumentCount } from "@/firebase/admin";
import { COLLECTIONS } from "@/firebase/constants";

import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default async function Loading() {
  return (
    <main className="mx-[10vw] w-[calc(100%-20vw)] space-y-10 pb-40 pt-10 sm:mx-auto sm:w-[min(500px,100%-120px)]">
      <div className="space-y-4">
        <div className="text-2xl">{""}</div>
        <div className="text-right text-2xl font-extralight">
          {new Date().toLocaleDateString("ja")}
        </div>
      </div>
    </main>
  );
}

const DataMonitor = async () => {
  const hanzisCount = await getDocumentCount(COLLECTIONS.hanzis);
  const articlesCount = await getDocumentCount(COLLECTIONS.articles);
  const sentencesCount = await getDocumentCount(COLLECTIONS.sentences);
  const invertedIndexesCount = await getDocumentCount(
    COLLECTIONS.invertedIndexes,
  );
  return (
    <>
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
    </>
  );
};
