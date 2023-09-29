"server only";

import { HanziList } from "@/features/hanzi";
import { PinyinList } from "@/features/pinyin";
import BatchAddHanzisButton from "@/features/seeds/components/BatchAddHanzisButton";
import { LangPotArticleList } from "@/features/sentenceSeeds";

export default async function Home() {
  return (
    <main className="mx-[10vw] w-[calc(100%-20vw)] space-y-8 py-28 sm:mx-auto sm:w-[min(500px,100%-120px)]">
      <div className="rounded bg-yellow-100 bg-opacity-40 p-5">
        <span className="pr-2">🔥</span>Build unigrams of sentence text!
      </div>
      <BatchAddHanzisButton />
      <HanziList />
      <PinyinList />

      <LangPotArticleList />
    </main>
  );
}
