"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hanzi, PinyinHanzi, buildHanziId } from "@/features/hanzi";

import {
  Pinyin,
  PinyinBadge,
  PinyinFilter,
  buildPinyin,
  buildPinyinFilter,
  getPinyinStr,
} from "@/features/pinyin";

import useDebouce from "@/hooks/useDebounce";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";
import { addHanziAction } from "@/features/hanzi/services/addHanziAction";

import { getHanzisByPinyinFilter } from "@/features/hanzi/services/firestore_restapi";
import {
  INITIAL_PINYIN,
  INITIAL_PINYIN_FILTERL,
} from "@/features/pinyin/schema";
import { useEffect, useState } from "react";
import HanziList from "./HanziList";

const HanziFormDialogContent = ({ form }: { form: string }) => {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [hanzis, setHanzis] = useState<Hanzi[]>([]);
  const [value, setValue] = useState<{ filter: PinyinFilter; pinyin: Pinyin }>({
    filter: INITIAL_PINYIN_FILTERL,
    pinyin: INITIAL_PINYIN,
  });

  const debouncedInput = useDebouce(input, 300);

  useEffect(() => {
    if (!debouncedInput) {
      setValue({ filter: INITIAL_PINYIN_FILTERL, pinyin: INITIAL_PINYIN });
      return;
    }
    const pinyin = buildPinyin(debouncedInput);
    const filter = buildPinyinFilter(debouncedInput);
    setValue({ pinyin, filter });
  }, [debouncedInput]);

  useEffect(() => {
    if (!input) {
      setHanzis([]);
      return;
    }
    const fetchData = async () => {
      const hanzis = await getHanzisByPinyinFilter(value.filter);
      setHanzis(hanzis);
    };
    fetchData();
  }, [value.filter, input]);

  const handleSubmit = async () => {
    const hanzi: Hanzi = {
      id: buildHanziId(form, value.pinyin),
      form,
      pinyin: value.pinyin,
      count: 0,
      latestSentenceId: "",
    };
    await addHanziAction(hanzi);
    toast({ description: `added hanzi: ${hanzi.form}` });
  };
  return (
    <div className="grid h-[calc(100vh-200px)] grid-rows-[auto,auto,auto,auto,1fr] space-y-4">
      <div className="grid grid-cols-[120px,150px,1fr,auto] items-center gap-2">
        <Input
          className=" bg-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="拼音"
        />
        <JSONMonitor form={form} pinyin={value.pinyin} />
        <div className="flex flex-col items-center gap-2">
          <PinyinBadge pinyin={value.pinyin} />
          <PinyinHanzi pinyinStr={getPinyinStr(value.pinyin)} form={form} />
        </div>
        <form action={handleSubmit}>
          <Button type="submit">登録</Button>
        </form>
      </div>
      <div className="text-sm font-extralight text-gray-700">{`Result: ${hanzis.length} hits`}</div>
      {hanzis.length < 200 ? (
        <HanziList hanzis={hanzis} />
      ) : (
        <div>More than 200 hanzis</div>
      )}
    </div>
  );
};

export default HanziFormDialogContent;

const JSONMonitor = ({ form, pinyin }: { form: string; pinyin: Pinyin }) => {
  return (
    <pre className={cn(fontSans.className, "text-xs ")}>
      {JSON.stringify(
        {
          form,
          pinyin,
        } as Hanzi,
        null,
        8,
      )}
    </pre>
  );
};
