"server only";

import { Article, BatchAddArticlesButton } from "@/features/article";
import { BatchAddHanzisButton } from "@/features/hanzi";
import { BuildInvetedIndexesButton } from "@/features/invertedIndex";
import {
  BatchAddSentencesButton,
  Sentence,
  SentenceLine,
} from "@/features/sentence";
import { getDocumentCount } from "@/firebase/admin";
import { COLLECTIONS } from "@/firebase/constants";
import { getRecentArticles, getSentencesByIds } from "@/firebase/restapi";

import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default async function Home() {
  const articles = await getRecentArticles(1);

  let article: Article | undefined;
  let sentences: Sentence[] = [];

  if (articles.length) {
    article = articles.at(0);
    if (article) {
      const { sentences: _sentences } = await getSentencesByIds(
        article?.sentenceIds,
      );
      if (_sentences.length) {
        sentences = _sentences;
      }
    }
  }

  return (
    <main className="mx-[10vw] w-[calc(100%-20vw)] space-y-10 pb-40 pt-10 sm:mx-auto sm:w-[min(500px,100%-120px)]">
      {process.env.NODE_ENV === "development" ? <DataMonitor /> : null}
      {article ? (
        <div className="space-y-4">
          <div className="text-2xl">{article.title}</div>
          <div className="text-right text-2xl font-extralight">
            {new Date(article.createdAt).toLocaleDateString("ja")}
          </div>
          <div className="space-y-2">
            {article.sentenceIds.map((sentenceId, index) => {
              const sentence = sentences.find((s) => s.id === sentenceId);
              if (!sentence) return null;
              return (
                <div
                  key={sentenceId}
                  className="grid grid-cols-[24px,1fr] items-center"
                >
                  <div>{index + 1}</div>
                  <SentenceLine sentence={sentence} />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
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
