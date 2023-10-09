"server only";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ArticleList, getRecentArticles } from "@/features/article";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const ArticleListPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.uid) {
    return (
      <div className="grid place-items-center text-5xl">you must log in</div>
    );
  }
  const articles = await getRecentArticles(3);
  return (
    <div className="mx-auto w-full max-w-lg  space-y-10 pt-10">
      <div>new</div>
      <div className="absolute">{session?.user.uid}</div>
      <div className="text-4xl font-extrabold">Article Listd</div>
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
