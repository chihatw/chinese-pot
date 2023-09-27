"use client";

import { Input } from "@/components/ui/input";
import { PinyinFilter } from "@/features/pinyin";
import { buildPinyinFilter } from "@/features/pinyin/services/buildPinyin";
import { useEffect, useState } from "react";
import { Hanzi } from "../../..";
import { filterPinyin } from "../../../services/util";
import FilterMonitor from "./FilterMonitor";
import VowelCardList from "./VowelCardList";

const PinyinFilterContainer = ({ hanzis }: { hanzis: Hanzi[] }) => {
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
      <div className="text-4xl font-extrabold">拼音篩選</div>
      <Input
        className=" bg-white"
        placeholder="拼音篩選"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <FilterMonitor filter={filter} />
      <VowelCardList hanzis={filteredHanzis} filter={filter} />
    </div>
  );
};

export default PinyinFilterContainer;
