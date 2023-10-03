"use client";
import { Input } from "@/components/ui/input";
import { buildNewSearchParamsPath } from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FORM_SEARCH_KEY } from "../../sentenceUnigram/constants";

const SearchSentencesByForms = ({ forms }: { forms: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [input, setInput] = useState(forms);

  useEffect(() => {
    // 入力から英字を削除
    const _form = input.trim().replace(/[a-zA-Z]/gi, "") || "";
    const newPath = buildNewSearchParamsPath(
      FORM_SEARCH_KEY,
      _form,
      pathname,
      searchParams,
    );
    const original = new URLSearchParams(Array.from(searchParams.entries()));
    const originalPath = `${pathname}${original.toString()}`;
    if (newPath === originalPath) return;
    // formが違う場合は、ページを更新して、データを再fetch
    router.push(newPath);
  }, [input, searchParams, pathname, router]);

  return (
    <div className="space-y-4">
      <div className="text-4xl font-bold">搜尋句子</div>

      <Input
        className="bg-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex items-end gap-2">
        <div className=" grid min-h-[40px] min-w-[40px] place-items-center rounded bg-white/40 p-2">
          {forms}
        </div>
      </div>
    </div>
  );
};

export default SearchSentencesByForms;
