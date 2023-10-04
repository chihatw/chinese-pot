"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hanzi } from "@/features/hanzi";
import useDebouce from "@/hooks/useDebounce";
import { buildNewSearchParamsPath } from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Sentence } from "../..";
import { SENTENCE_FORM_KEY } from "../../constants";
import FormMonitor from "./FormMonitor";
import Note from "./Note";
import SelectedHanzisMonitor from "./SelectedHanzisMonitor";

const SentenceForm = ({
  forms,
  hanzis,
  sentences,
}: {
  forms: string;
  hanzis: Hanzi[];
  sentences: { [form: string]: Sentence };
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [input, setInput] = useState(forms);
  const debouncedInput = useDebouce(input, 300);
  const [selectedHanziIds, setSelectedHanziIds] = useState(
    forms.split("").map((form) => {
      // hanzis から form で厳選
      const items = hanzis.filter((h) => h.form === form);
      // １つ目の hanzi の id を代入
      return items.at(0)?.id || "";
    }),
  );

  useEffect(() => {
    const selectedHanziIds = forms.split("").map((form) => {
      // hanzis から form で厳選
      const items = hanzis.filter((h) => h.form === form);
      // １つ目の hanzi の id を代入
      return items.at(0)?.id || "";
    });
    setSelectedHanziIds(selectedHanziIds);
  }, [forms, hanzis]);

  useEffect(() => {
    const forms = debouncedInput.trim().replace(/[a-zA-Z]/gi, "") || "";

    const newPath = buildNewSearchParamsPath(
      SENTENCE_FORM_KEY,
      forms,
      pathname,
      searchParams,
    );

    const original = new URLSearchParams(Array.from(searchParams.entries()));
    let originalPath = pathname;
    if (!!original.toString()) {
      originalPath += `?${original.toString()}`;
    }
    if (newPath === originalPath) return;

    // formが違う場合は、ページを更新して、データを再fetch
    router.push(newPath);
  }, [debouncedInput, pathname, searchParams, router]);

  return (
    <div>
      <div className="text-4xl font-bold">SentenceForm</div>
      <div className="grid gap-4 pt-4">
        <Input
          className="bg-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="space-y-4">
          {(input.trim().replace(/[a-zA-Z]/gi, "") || "")
            .split("")
            .map((form, index) => (
              <FormMonitor
                key={index}
                index={index}
                form={form}
                hanzis={hanzis.filter((h) => h.form === form)}
                selectedHanziId={selectedHanziIds[index]}
                setSelectedHanziIds={setSelectedHanziIds}
                sentence={sentences[form]}
              />
            ))}
        </div>
        <SelectedHanzisMonitor
          hanzis={hanzis}
          selectedHanziIds={selectedHanziIds}
        />
        <Button disabled={selectedHanziIds.some((id) => !id)}>submit</Button>
      </div>
      <Note />
    </div>
  );
};

export default SentenceForm;
