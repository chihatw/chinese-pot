import RevalidatePane from "@/components/RevalidatePane";
import { ArticleList } from "@/features/article";
import { getRecentArticles } from "@/firebase/restapi";

import { Plus } from "lucide-react";
import Link from "next/link";

const ArticleListPage = async () => {
  const { articles, readTime } = await getRecentArticles(3);

  return (
    <div className="mx-auto w-full max-w-lg  space-y-10 pt-10">
      <div className="text-4xl font-extrabold">Article List</div>
      <RevalidatePane readTime={readTime} pathname="/article/list" />
      <div className="flex">
        <Link href={"/article/form"}>
          <div className="flex items-center gap-1 rounded bg-primary px-4 py-2 text-white">
            <span>Create New Article</span>
            <Plus size={22} />
          </div>
        </Link>
      </div>
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticleListPage;
