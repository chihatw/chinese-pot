import RevalidatePane from "@/components/RevalidatePane";
import { Article, BatchAddArticlesButton } from "@/features/article";
import { BatchAddHanzisButton } from "@/features/hanzi";
import { BuildInvetedIndexesButton } from "@/features/invertedIndex";
import {
  BatchAddSentencesButton,
  Sentence,
  SentenceTable,
} from "@/features/sentence";
import { getDocumentCount } from "@/firebase/admin";
import { COLLECTIONS } from "@/firebase/constants";
import { getRecentArticles, getSentencesByIds } from "@/firebase/restapi";

import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  const { articles, readTime } = await getRecentArticles(1);

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
    <main className="mx-auto w-full  max-w-md space-y-4 pb-40 pt-10">
      {process.env.NODE_ENV === "development" ? <DataMonitor /> : null}
      <div className="text-2xl font-bold">{article?.title}</div>
      {article ? (
        <div>{new Date(article.createdAt).toLocaleDateString("ja-JP")}</div>
      ) : null}
      <RevalidatePane readTime={readTime} pathname="/" />
      {article ? (
        <div className="flex">
          <Link href={`/article/${article.id}/form`}>
            <div className="rounded-lg bg-primary px-4 py-1.5 text-white">
              Create New Sentence
            </div>
          </Link>
        </div>
      ) : null}
      {article ? (
        <SentenceTable
          sentences={article.sentenceIds
            .map((id) => sentences.find((s) => s.id === id)!)
            .filter(Boolean)}
        />
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
