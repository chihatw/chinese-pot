"use client";

import { Input } from "@/components/ui/input";
import { PinyinFilter } from "@/features/pinyin";
import { buildPinyinFilter } from "@/features/pinyin/services/buildPinyin";
import { fontSans } from "@/lib/fonts";
import { useEffect, useState } from "react";
import { Hanzi_old } from "../../..";
import { filterPinyin } from "../../../services/util";
import FilterMonitor from "./FilterMonitor";
import VowelCardList from "./VowelCardList";

const PinyinFilterContainer = ({ hanzis }: { hanzis: Hanzi_old[] }) => {
  const [input, setInput] = useState("");
  const [value, setValue] = useState<{
    filter: PinyinFilter;
    filteredHanzis: Hanzi_old[];
  }>({
    filter: {
      vowels: [],
      consonants: [],
      tone: "",
    },
    filteredHanzis: [],
  });

  useEffect(() => {
    const filter = buildPinyinFilter(input);
    const filteredHanzis = hanzis.filter((hanzi) =>
      filterPinyin(hanzi, filter),
    );
    setValue({ filteredHanzis, filter });
  }, [input, hanzis]);

  return (
    <div className="space-y-4">
      <div className={`text-4xl font-bold ${fontSans.className}`}>拼音篩選</div>
      <Input
        className=" bg-white"
        placeholder="拼音篩選"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <FilterMonitor filter={value.filter} />
      <VowelCardList hanzis={value.filteredHanzis} filter={value.filter} />
    </div>
  );
};

export default PinyinFilterContainer;
