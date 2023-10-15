"use client";

import {
  ArticleSentences,
  useArticleSentences,
} from "@/features/articleSentences";
import SentenceTable from "@/features/sentence/components/SentenceTable";
import Link from "next/link";
import { useEffect } from "react";
import { INITIAL_ARTICLE_SENTENCES } from "../constants";

const ArticleSentenceList = ({ article, sentences }: ArticleSentences) => {
  const { optimisticValue, dispatch } = useArticleSentences();
  useEffect(() => {
    dispatch({
      type: "SET",
      payload: article ? { article, sentences } : INITIAL_ARTICLE_SENTENCES,
    });
  }, [article, dispatch, sentences]);

  if (!optimisticValue.article) return null;
  return (
    <>
      <div className="flex">
        <Link href={`/article/${optimisticValue.article.id}/form`}>
          <div className="rounded-lg bg-primary px-4 py-1.5 text-white">
            Create New Sentence
          </div>
        </Link>
      </div>
      <SentenceTable
        sentences={optimisticValue.article.sentenceIds.map(
          (id) => sentences.find((s) => s.id === id)!,
        )}
        articleId={optimisticValue.article.id}
      />
    </>
  );
};

export default ArticleSentenceList;
