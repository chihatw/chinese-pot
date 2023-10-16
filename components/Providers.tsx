"use client";

import { SessionProvider } from "@/features/auth";
import Provider from "@/trpc/Provider";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Provider>{children}</Provider>
    </SessionProvider>
  );
}
