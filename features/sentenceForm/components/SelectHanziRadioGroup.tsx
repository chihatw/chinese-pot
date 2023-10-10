"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Hanzi, PinyinHanzi } from "@/features/hanzi";
import {
  Sentence,
  SentenceLine,
  buildHanzisFromSentence,
} from "@/features/sentence";
import { Dispatch, SetStateAction } from "react";

const SelectHanziRadioGroup = ({
  index,
  sentences,
  selectedHanziId,
  setSelectedHanziIds,
  hanzis,
  form,
}: {
  form: string;
  index: number;
  selectedHanziId: string;
  setSelectedHanziIds: Dispatch<SetStateAction<string[]>>;
  hanzis: Hanzi[];
  sentences: Sentence[];
}) => {
  const handleValueChange = (value: string) => {
    setSelectedHanziIds((prev) => {
      prev.splice(index, 1, value);
      return [...prev];
    });
  };

  return (
    <RadioGroup value={selectedHanziId} onValueChange={handleValueChange}>
      <div className="grid gap-2">
        {hanzis
          .sort((a, b) => b.count - a.count)
          .map((hanzi) => {
            const pinyinSrt =
              hanzi.pinyin.consonant + hanzi.pinyin.vowel + hanzi.pinyin.tone;

            const sentence = sentences
              .filter((s) => {
                const hanzis = buildHanzisFromSentence(s);
                hanzis.map((h) => h.id).includes(hanzi.id);
                return hanzis.map((h) => h.id).includes(hanzi.id);
              })
              .at(0);
            return (
              <div key={hanzi.id} className="flex items-center gap-2 ">
                <div className="grid grid-cols-[auto,36px] items-center gap-2 rounded bg-white px-4 py-2">
                  <RadioGroupItem value={hanzi.id} />
                  <div className="grid place-items-center ">
                    <PinyinHanzi form={hanzi.form} pinyinStr={pinyinSrt} />
                  </div>
                </div>

                {sentence ? (
                  <SentenceLine
                    sentence={sentence}
                    highlight={form}
                    textSize="text-sm"
                  />
                ) : null}
              </div>
            );
          })}
      </div>
    </RadioGroup>
  );
};

export default SelectHanziRadioGroup;
