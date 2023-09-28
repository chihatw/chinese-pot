"use client";
import { PinyinBadge } from "@/features/pinyin";
import { buildPinyin } from "@/features/pinyin/services/buildPinyin";
import { ARTICLES as articles, SENTENCES as sentences } from "..";

const LangPotArticleList = () => {
  // ----

  // ----
  const gotIndex = Math.floor(Math.random() * 100);
  const article = articles.at(gotIndex);
  if (!article) return null;
  const date = new Date(article.createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (
    <div className="mx-auto w-full max-w-xl space-y-4 pt-8">
      <div className="text-4xl font-bold">看世界資料庫</div>

      <div key={article.id} className="space-y-4 rounded bg-white p-5">
        <div className=" text-gray-500">{`${year}-${month}-${day}`}</div>
        <div className="text-lg font-bold">{article.title}</div>

        {article.sentenceIds.map((sentenceId) => {
          const sentence = sentences.find((s) => s.id === sentenceId);
          return (
            <div key={sentenceId}>
              <div className="text-lg font-light tracking-wider">
                {sentence?.text}
              </div>
              <div className="flex flex-wrap gap-1">
                {sentence?.pinyinsStr.split(" ").map((pinyinStr, index) => {
                  if (pinyinStr === "*") return <span key={index}></span>;

                  const pinyin = buildPinyin(pinyinStr);
                  return <PinyinBadge key={index} pinyin={pinyin} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LangPotArticleList;
