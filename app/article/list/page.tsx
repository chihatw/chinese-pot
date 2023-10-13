"server only";

import { Button } from "@/components/ui/button";
import { ArticleList } from "@/features/article";
import { getRecentArticles } from "@/firebase/restapi";

import { Plus, RefreshCcw } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const ArticleListPage = async () => {
  const { articles, readTime } = await getRecentArticles(50);

  const handleSubmit = async () => {
    "use server";
    revalidatePath(`/article/list`);
  };

  return (
    <div className="mx-auto w-full max-w-lg  space-y-10 pt-10">
      <div className="text-4xl font-extrabold">Article List</div>
      <div className="flex items-center justify-between">
        <form action={handleSubmit}>
          <Button className="flex gap-2" type="submit">
            <span>Revalidate</span>
            <RefreshCcw />
          </Button>
        </form>
        <div className="text-xs font-extralight">{`fetched at ${
          new Date(readTime).toLocaleString().split(" ")[1]
        }`}</div>
      </div>
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
