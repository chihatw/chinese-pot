"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pinyin, PinyinLine, buildPinyin } from "@/features/pinyin";
import { useEffect, useState } from "react";
import {
  Hanzi,
  addHanziAction,
  createNewHanzi,
  isValidHanziFormData,
} from "..";

const HanziForm = () => {
  const [value, setValue] = useState<
    Pick<Hanzi, "form"> & {
      pinyinStr: string;
      pinyin: Pinyin | undefined;
    }
  >({ pinyinStr: "", pinyin: undefined, form: "" });

  useEffect(() => {
    const pinyin = buildPinyin(value.pinyinStr);
    setValue((prev) => ({ ...prev, pinyin }));
  }, [value.pinyinStr]);

  const handleSubmit = () => {
    const newHanzi = createNewHanzi({
      form: value.form,
      pinyin: value.pinyin!,
    });
    addHanziAction(newHanzi);
    setValue({ form: "", pinyin: undefined, pinyinStr: "" });
  };

  return (
    <form className="w-full max-w-md space-y-4" action={handleSubmit}>
      <div className="text-4xl font-extrabold"> Hanzi Form</div>
      <Input
        className="bg-white"
        placeholder="漢字"
        value={value.form}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, form: e.target.value }))
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
      <PinyinLine pinyins={[value.pinyin]} />
      <div className="text-right">
        <Button
          type="submit"
          className="focus-visible:bg-main-600"
          disabled={!isValidHanziFormData(value.form, value.pinyin)}
        >
          Create New Hanzi
        </Button>
      </div>
    </form>
  );
};

export default HanziForm;
