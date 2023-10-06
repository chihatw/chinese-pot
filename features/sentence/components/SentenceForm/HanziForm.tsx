"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PinyinHanzi, buildHanziId } from "@/features/hanzi";
import { Hanzi } from "@/features/hanzi/schema";
import { Pinyin, PinyinBadge } from "@/features/pinyin";
import { buildPinyin } from "@/features/pinyin/services/buildPinyin";
import { getPinyinStr } from "@/features/pinyin/services/utils";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const HanziForm = ({ form }: { form: string }) => {
  const [input, setInput] = useState("");
  const [pinyin, setPinyin] = useState<Pinyin>({
    tone: "",
    consonant: "",
    vowel: "",
  });

  useEffect(() => {
    const pinyin = buildPinyin(input);
    setPinyin(pinyin);
  }, [input]);

  const handleSubmit = async () => {
    const hanzi: Hanzi = {
      id: buildHanziId(form, pinyin),
      form,
      pinyin,
      count: 0,
      latestSentenceId: "",
    };
    // todo
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="ghost"
          size="sm"
          className=" flex items-center gap-1 text-destructive"
        >
          <div>新規登録</div>
          <Plus size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-2">
          <div className="grid grid-cols-[120px,150px,1fr,auto] items-center gap-2">
            <div className="h-full space-y-8">
              <div className="text-xs font-extralight text-destructive">
                新規登録
              </div>
              <Input
                className=" bg-white"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="拼音"
              />
            </div>
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
            <div className="flex flex-col items-center justify-center gap-2">
              <PinyinBadge pinyin={pinyin} />
              <div className="rounded bg-white p-2">
                <PinyinHanzi pinyinStr={getPinyinStr(pinyin)} form={form} />
              </div>
            </div>
            <form action={handleSubmit}>
              <Button size="icon" type="submit">
                <Plus />
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HanziForm;
