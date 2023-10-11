"use client";

import useBuildSearchParams from "@/hooks/useBuildSearchParams";
import useDebouce from "@/hooks/useDebounce";
import { useEffect, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";

import {
  SentenceFormProps,
  getSelectedHanziIds,
} from "@/features/sentenceForm";
import { SENTENCE_FORM_KEY } from "@/features/sentenceForm/constants";

import { addSentenceAction } from "@/app/_actions";
import ServerActionPendingButton from "@/components/ServerActionPendingButton";
import { SEARCH_SENTENCES_MAX } from "@/features/invertedIndex/constants";
import FormMonitor from "./FormMonitor";
import SelectedHanzisMonitor from "./SelectedHanzisMonitor";

const SentenceForm = ({
  forms,
  hanzis,
  sentences,
  articleId,
  total,
}: SentenceFormProps) => {
  const [input, setInput] = useState(forms);
  const debouncedInput = useDebouce(input, 300);

  const searchParamsValue = useMemo(
    () => debouncedInput.trim().replace(/[a-zA-Z]/gi, "") || "",
    [debouncedInput],
  );

  useBuildSearchParams(searchParamsValue, SENTENCE_FORM_KEY);

  const [selectedHanziIds, setSelectedHanziIds] = useState(
    getSelectedHanziIds(forms, hanzis),
  );

  useEffect(() => {
    const selectedHanziIds = getSelectedHanziIds(forms, hanzis);
    setSelectedHanziIds(selectedHanziIds);
  }, [forms, hanzis]);

  const handleSubmit = async () => {
    await addSentenceAction(selectedHanziIds, hanzis, articleId);
  };

  return (
    <div className="grid gap-4">
      <Input
        className="bg-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="space-y-4">
        <div className="font-extralight">
          <span> {total}</span>
          {total > SEARCH_SENTENCES_MAX ? (
            <span>該当文が多すぎます</span>
          ) : null}
        </div>
        {searchParamsValue.split("").map((form, index) => (
          <FormMonitor
            key={index}
            index={index}
            form={form}
            sentences={sentences}
            hanzis={hanzis.filter((h) => h.form === form)}
            selectedHanziId={selectedHanziIds[index]}
            setSelectedHanziIds={setSelectedHanziIds}
          />
        ))}
      </div>
      <SelectedHanzisMonitor
        hanzis={hanzis}
        selectedHanziIds={selectedHanziIds}
      />
      <form action={handleSubmit}>
        <div className="grid">
          <ServerActionPendingButton
            disabled={selectedHanziIds.some((id) => !id)}
            label={articleId ? `Add to Article` : "Create New Sentence"}
          />
        </div>
      </form>
    </div>
  );
};

export default SentenceForm;
