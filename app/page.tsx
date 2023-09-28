"server only";

import { LangPotArticleList } from "@/features/articleSeeds";
import { HanziList } from "@/features/hanzi";
import { PinyinList } from "@/features/pinyin";
import BatchAddHanzisButton from "@/features/seeds/components/BatchAddHanzisButton";

// import { HanziForm, HanziList } from "@/features/hanzi";
// import { PinyinList } from "@/features/pinyin";

export default async function Home() {
  return (
    <main className="mx-[10vw] w-[calc(100%-20vw)] space-y-8 py-28 sm:mx-auto sm:w-[min(800px,100%-120px)]">
      <div className="mx-auto max-w-md">
        <BatchAddHanzisButton />
      </div>
      <HanziList />
      <PinyinList />

      <LangPotArticleList />
    </main>
  );
}
