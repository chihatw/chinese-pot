"server only";

import { LangPotArticleList } from "@/features/articleSeeds";

// import { HanziForm, HanziList } from "@/features/hanzi";
// import { PinyinList } from "@/features/pinyin";

export default async function Home() {
  return (
    <main className="mx-[10vw] w-[calc(100%-20vw)] py-28 sm:mx-auto sm:w-[min(800px,100%-120px)]">
      <LangPotArticleList />
      {/* <div className="grid  place-items-center gap-y-8 ">
        <HanziForm />
        <HanziList />
        <PinyinList />
      </div> */}
    </main>
  );
}
