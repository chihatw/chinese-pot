"use client";

import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { Article } from "../schema";
import { deleteArticleAction } from "../services/actions";

const ArticleList = ({ articles }: { articles: Article[] }) => {
  const handleSubmit = async (id: string) => {
    await deleteArticleAction(id);
  };
  return (
    <div className="grid gap-y-10 pb-40">
      {articles.map((article) => (
        <div
          key={article.id}
          className="space-y-2 rounded bg-white p-5 pt-3 shadow"
        >
          <div className="space-x-1 text-sm font-extralight text-gray-500">
            <span>{new Date(article.createdAt).toLocaleDateString("ja")}</span>
            <span>-</span>
            <span>{article.sentenceIds.length}</span>
          </div>
          <div className="grid grid-cols-[1fr,auto,auto] items-center gap-2">
            <Link href={`/article/${article.id}`}>
              <div className="space-y-2 ">
                <div>{article.title}</div>
              </div>
            </Link>
            <Link href={`/article/form?id=${article.id}`}>
              <Edit2 />
            </Link>
            <form action={() => handleSubmit(article.id)}>
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                disabled={!!article.sentenceIds.length}
              >
                <Trash2 />
              </Button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
