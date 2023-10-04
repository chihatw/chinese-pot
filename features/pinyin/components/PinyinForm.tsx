"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Pinyin, PinyinLine } from "..";
import { buildPinyins } from "../services/buildPinyin";

const PinyinForm = () => {
  const [value, setValue] = useState<{
    pinyinStr: string;
    pinyins: Pinyin[];
  }>({ pinyinStr: "", pinyins: [] });

  useEffect(() => {
    const pinyins = buildPinyins(value.pinyinStr);
    setValue((prev) => ({ ...prev, pinyins }));
  }, [value.pinyinStr]);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-4xl font-extrabold">Pinyin Form</div>
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
      <PinyinLine pinyins={value.pinyins} />
    </div>
  );
};

export default PinyinForm;
