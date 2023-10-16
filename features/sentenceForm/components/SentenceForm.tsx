"use client";

import useBuildSearchParams from "@/hooks/useBuildSearchParams";
import useDebouce from "@/hooks/useDebounce";
import { useEffect, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";

import {
  SentenceFormProps,
  buildSentence_from_selectedHanzis,
  getSelectedHanziIds,
} from "@/features/sentenceForm";
import { SENTENCE_FORM_KEY } from "@/features/sentenceForm/constants";

import ServerActionPendingButton from "@/components/ServerActionPendingButton";

import { addSentenceAction } from "@/app/_actions";
import { SEARCH_SENTENCES_MAX, SENTENCE_TEXT_MAX } from "@/firebase/constants";
import { nanoid } from "nanoid";

import FormMonitor from "./FormMonitor";
import SelectedHanzisMonitor from "./SelectedHanzisMonitor";

const SentenceForm = ({
  forms,
  hanzis,
  hanziSentences,
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
    const selectedHanzis = selectedHanziIds.map(
      (id) => hanzis.find((h) => h.id === id)!,
    );
    const sentenceId = nanoid();

    const sentence = buildSentence_from_selectedHanzis(
      selectedHanzis,
      sentenceId,
    );

    await addSentenceAction(sentence, selectedHanzis, articleId);
  };

  return (
    <div className="relative grid gap-4">
      <div className="absolute -top-8 right-0 ">
        <span className="text-xs font-extralight text-gray-500">{`text length: ${input.length}/${SENTENCE_TEXT_MAX}`}</span>
      </div>
      <Input
        className="bg-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={SENTENCE_TEXT_MAX}
      />
      <div className="space-y-4">
        <div className="font-extralight">
          <span> {total}</span>
          {total > SEARCH_SENTENCES_MAX ? (
            <span>{`該当文が ${SEARCH_SENTENCES_MAX} を超えます`}</span>
          ) : null}
        </div>
        {searchParamsValue.split("").map((form, index) => (
          <FormMonitor
            key={index}
            index={index}
            form={form}
            sentences={hanziSentences}
            hanzis={hanzis.filter((h) => h.form === form)}
            selectedHanziId={selectedHanziIds[index]}
            setSelectedHanziIds={setSelectedHanziIds}
            articleId={articleId}
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
            disabled={
              selectedHanziIds.some((id) => !id) || !selectedHanziIds.length
            }
            label={articleId ? `Add to Article` : "Create New Sentence"}
          />
        </div>
      </form>
    </div>
  );
};

export default SentenceForm;
