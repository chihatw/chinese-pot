"server only";

import { getArticlesByIds } from "@/firebase/restapi";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";
export const appRouter = router({
  getArticle: publicProcedure.input(z.string()).query(async ({ input }) => {
    if (!input) return;
    const articles = await getArticlesByIds([input]);
    return articles.at(0);
  }),
});

export type AppRouter = typeof appRouter;
