"use client";
import { ARTICLES as articles, SENTENCES as sentences } from "..";

const LangPotArticleList = () => {
  return (
    <div className="space-y-4 pt-8">
      <div className="text-4xl font-extrabold">LangPot Article List</div>

      {articles.map((article) => {
        return (
          <div key={article.id} className="rounded bg-white p-5">
            <pre className="text-xs">{JSON.stringify(article, null, 2)}</pre>
            <div className="space-y-0">
              {article.sentenceIds.map((sentenceId) => {
                const sentence = sentences.find((s) => s.id === sentenceId);
                return (
                  <div key={sentenceId}>
                    <pre className="text-xs">{sentence?.text}</pre>
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
