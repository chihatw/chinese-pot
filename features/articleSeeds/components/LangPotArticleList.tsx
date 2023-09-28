"use client";
import { PinyinBadge } from "@/features/pinyin";
import { ARTICLES as articles, SENTENCES as sentences } from "..";

const LangPotArticleList = () => {
  const gotIndex = Math.floor(Math.random() * 100);
  return (
    <div className="space-y-4 pt-8">
      <div className="text-4xl font-extrabold">LangPot Article List</div>

      {articles.slice(gotIndex, gotIndex + 1).map((article) => {
        return (
          <div key={article.id} className="rounded bg-white p-5">
            <pre className="text-xs">{JSON.stringify(article, null, 2)}</pre>
            <div className="space-y-4">
              {article.sentenceIds.map((sentenceId) => {
                const sentence = sentences.find((s) => s.id === sentenceId);
                return (
                  <div key={sentenceId}>
                    <pre className="text-xs">{sentence?.text}</pre>
                    <div className="flex flex-wrap gap-1">
                      {sentence?.pinyins.map((pinyin, index) => (
                        <PinyinBadge key={index} pinyin={pinyin} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LangPotArticleList;
