"use client";
import { Input } from "@/components/ui/input";
import { Sentence } from "@/features/sentence";
import { buildNewSearchParamsPath } from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FORM_SEARCH_KEY } from "../constants";

const SearchSentencesByForms = ({
  form,
  sentences,
}: {
  form: string;
  sentences: Sentence[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [input, setInput] = useState(form);

  useEffect(() => {
    // 入力から英字を削除
    const _form = input.replace(/[a-zA-Z\+]/gi, "") || "";
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
      <div className="text-4xl font-bold">Search By Forms</div>

      <Input
        className="bg-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex items-end gap-2">
        <div className=" grid min-h-[40px] min-w-[40px] place-items-center rounded bg-white/40 p-2">
          {form}
        </div>
      </div>
      <div className="space-y-2">
        <div>{`${sentences.length}`}</div>
        {sentences.map((sentence) => (
          <div key={sentence.id} className="rounded bg-white p-2 ">
            {sentence.text.split(form).map((unit, index, self) => (
              <span key={index}>
                <span>{unit}</span>
                {index < self.length - 1 ? (
                  <span key={index} className={"text-destructive"}>
                    {form}
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSentencesByForms;
