"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Hanzi, getHanzisByVowel, getVowelCounts } from "@/features/hanzi";
import { PinyinFilter } from "@/features/pinyin";
import React, { useState } from "react";

import FormsMonitor from "../../FormsMonitor";
import VowelCard from "./VowelCard";

export const VowelCardList = React.memo(function Arrow_function_occurs_error({
  hanzis,
  filter,
}: {
  hanzis: Hanzi[];
  filter: PinyinFilter;
}) {
  const vowelCounts = getVowelCounts(hanzis);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className=" pr-2">
        <FormsMonitor hanzis={hanzis} />
        <div className="text-right font-light">{`total: ${hanzis.length}`}</div>
        <div className="flex items-center justify-end space-x-2">
          <Label htmlFor="open-vowelCards" className="font-light">
            Open
          </Label>
          <Switch
            id="open-vowelCards"
            checked={open}
            onCheckedChange={(value) => setOpen(value)}
          />
        </div>
      </div>
      {!!filter.consonants.length ||
      !!filter.vowels.length ||
      !!filter.tone ||
      open ? (
        <>
          {Object.entries(vowelCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([vowel]) => (
              <VowelCard
                key={vowel}
                vowel={vowel}
                hanzis={getHanzisByVowel(hanzis, vowel)}
              />
            ))}
        </>
      ) : null}
    </div>
  );
});

export default VowelCardList;