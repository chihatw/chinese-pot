"server only";

import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <main className="mx-[10vw] w-[calc(100%-20vw)] space-y-10 pb-40 pt-10 sm:mx-auto sm:w-[min(500px,100%-120px)]">
      <div className="space-y-4 pt-10">
        {"1234567890".split("").map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    </main>
  );
}
