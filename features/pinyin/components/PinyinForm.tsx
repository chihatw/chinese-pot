"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Pinyin, buildPinyins, isDisable } from "..";
import PinyinBadges from "./PinyinBadges";

const PinyinForm = () => {
  const [value, setValue] = useState<{
    pinyinStr: string;
    hanzi: string;
    pinyins: (Pinyin | undefined)[];
  }>({ pinyinStr: "", pinyins: [], hanzi: "" });

  useEffect(() => {
    const pinyins = buildPinyins(value.pinyinStr);
    setValue((prev) => ({ ...prev, pinyins }));
  }, [value.pinyinStr]);

  return (
    <div className="max-w-md space-y-4">
      <div className="text-4xl font-extrabold">PinyinForm</div>
      <Input
        className="bg-white"
        placeholder="漢字"
        value={value.hanzi}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, hanzi: e.target.value }))
        }
      />
      <Input
        className="peer bg-white"
        placeholder="拼音"
        value={value.pinyinStr}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            pinyinStr: e.target.value,
          }))
        }
      />
      <div className="flex flex-wrap gap-x-1 px-2">
        {value.pinyins.map((pinyin, index) => (
          <PinyinBadges key={index} pinyin={pinyin} />
        ))}
      </div>
      <div className="text-right">
        <Button disabled={isDisable(value.hanzi, value.pinyins)}>Submit</Button>
      </div>
    </div>
  );
};

export default PinyinForm;
