"use client";

import { AuthContextProvider, SessionProvider } from "@/features/auth";
import Provider from "@/trpc/Provider";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>
        <Provider>{children}</Provider>
      </AuthContextProvider>
    </SessionProvider>
  );
}
