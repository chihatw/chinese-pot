"use client";

import { Input } from "@/components/ui/input";
import { FORM_SEARCH_KEY } from "@/features/invertedIndex";
import { Sentence } from "@/features/sentence";
import useDebouce from "@/hooks/useDebounce";
import { buildNewSearchParamsPath } from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * 入力を search params に反映させて、サーバーサイド で fetch する。
 *
 * trpc を使えば、クライアントサイドから直接 fetch できる。
 *
 * search params: ページ更新が増える。
 *
 * trpc: 通信頻度が増える。
 */
const SearchSentencesByOneForm = ({
  form,
  sentences,
}: {
  form: string;
  sentences: Sentence[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [input, setInput] = useState("");
  const debouncesInput = useDebouce(input, 300);
  // ここに trpc を使えば、ページ更新せずに データを fetch することも可能

  useEffect(() => {
    // 入力から英字を削除
    const form = debouncesInput.replace(/[a-zA-Z\+]/gi, "") || "";
    const newPath = buildNewSearchParamsPath(
      FORM_SEARCH_KEY,
      form,
      pathname,
      searchParams,
    );

    let originalPath = pathname;
    const original = new URLSearchParams(Array.from(searchParams.entries()));
    originalPath += `?${original.toString()}`;

    if (newPath === originalPath) return;
    // formが違う場合は、ページを更新して、データを再fetch
    router.push(newPath);
  }, [debouncesInput, searchParams, pathname, router]);

  return (
    <div className="space-y-4">
      <div className="text-4xl font-bold">Search By One Form</div>

      <Input
        className="bg-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex items-end gap-2">
        <div className=" grid aspect-square w-10 place-items-center rounded bg-white">
          {form.at(0)}
        </div>
      </div>
      <div className="space-y-2">
        <div>{`${sentences.length}`}</div>
        {sentences.map((sentence) => (
          <div key={sentence.id} className="rounded bg-white p-2 ">
            {sentence.text.split("").map((char, index) => (
              <span
                key={index}
                className={
                  char === form.at(0) ? "text-destructive" : "text-inherit"
                }
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSentencesByOneForm;
