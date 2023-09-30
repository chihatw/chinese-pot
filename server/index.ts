"server only";
import { getArticle } from "@/features/article/services/firebase";
import { getSentencesByOneForm } from "@/features/sentenceUnigram/services/firebase";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";
export const appRouter = router({
  getSentencesByOneForm: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      if (!input) return [];
      // todo cache
      return await getSentencesByOneForm(input);
    }),
  getArticle: publicProcedure.input(z.string()).query(async ({ input }) => {
    if (!input) return;
    return await getArticle(input);
  }),
});

export type AppRouter = typeof appRouter;
