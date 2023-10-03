"server only";
import { getArticle } from "@/features/article/services/firebase";
import { getSentencesByOneForm_deprecated } from "@/features/sentenceUnigram_deprecated/services/firebase";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";
export const appRouter = router({
  getSentencesByOneForm_deprecated: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      if (!input) return [];
      return await getSentencesByOneForm_deprecated(input);
    }),
  getArticle_deprecated: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      if (!input) return;
      return await getArticle(input);
    }),
});

export type AppRouter = typeof appRouter;
