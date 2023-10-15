"use client";

import { ArticleSentencesContextProvider } from "@/features/articleSentences";
import { SessionProvider } from "@/features/auth";
import Provider from "@/trpc/Provider";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ArticleSentencesContextProvider>
        <Provider>{children}</Provider>
      </ArticleSentencesContextProvider>
    </SessionProvider>
  );
}
