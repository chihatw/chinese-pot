"server only";

import { HanziForm, HanziList } from "@/features/hanzi";
import { PinyinList } from "@/features/pinyin";
import { SeedsList } from "@/features/seeds";

export default async function Home() {
  return (
    <main className="mx-[10vw] w-[calc(100%-20vw)] py-28 sm:mx-auto sm:w-[min(800px,100%-120px)]">
      <div className="grid  place-items-center gap-y-8 ">
        <SeedsList />
        <HanziForm />
        <HanziList />
        <PinyinList />
      </div>
    </main>
  );
}
