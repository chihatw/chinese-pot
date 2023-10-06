"use client";

import { Input } from "@/components/ui/input";

import { getHanzisByPinyinFilter_client } from "@/features/hanzi/services/firebase_client";
import { PinyinFilter } from "@/features/pinyin";
import { buildPinyinFilter } from "@/features/pinyin/services/buildPinyin";
import useDebouce from "@/hooks/useDebounce";
import { fontSans } from "@/lib/fonts";
import { useEffect, useState } from "react";
import { Hanzi } from "../../..";
import FilterMonitor from "./FilterMonitor";
import VowelCardList from "./VowelCardList";

const PinyinFilterContainer = ({ hanzis }: { hanzis: Hanzi[] }) => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebouce(input, 300);
  const [value, setValue] = useState<{
    filter: PinyinFilter;
    filteredHanzis: Hanzi[];
  }>({
    filter: {
      vowels: [],
      consonants: [],
      tone: "",
    },
    filteredHanzis: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const filter = buildPinyinFilter(debouncedInput);
      const hanzis = await getHanzisByPinyinFilter_client(filter);
      setValue({ filteredHanzis: hanzis, filter });
    };
    fetchData();
  }, [debouncedInput, hanzis]);

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
