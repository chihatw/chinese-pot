"use client";

import { Input } from "@/components/ui/input";
import { PinyinBadge, PinyinFilter } from "@/features/pinyin";
import { buildPinyinFilter } from "@/features/pinyin/services/buildPinyin";
import { useEffect, useState } from "react";
import { Hanzi } from "../..";
import { filterPinyin } from "../../services/util";
import VowelCardList from "./VowelCardList";

const FilterContainer = ({ hanzis }: { hanzis: Hanzi[] }) => {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<PinyinFilter>({
    vowels: [],
    consonants: [],
    tone: "",
  });

  useEffect(() => {
    const filter = buildPinyinFilter(input);
    setFilter(filter);
  }, [input]);

  const filteredHanzis = hanzis.filter((hanzi) => filterPinyin(hanzi, filter));

  return (
    <div className="space-y-4">
      <Input
        className=" bg-white"
        placeholder="拼音篩選"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex gap-x-1">
        {filter.consonants.map((consonant) => (
          <PinyinBadge
            key={consonant}
            pinyin={{ consonant, tone: "", vowel: "" }}
          />
        ))}
        {filter.vowels.map((vowel) => (
          <PinyinBadge
            key={vowel}
            pinyin={{ consonant: "", tone: "", vowel }}
          />
        ))}
      </div>
      <VowelCardList hanzis={filteredHanzis} />
    </div>
  );
};

export default FilterContainer;
