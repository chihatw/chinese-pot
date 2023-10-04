"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pinyin, PinyinLine } from "@/features/pinyin";
import { useEffect, useState } from "react";

import { buildPinyin } from "@/features/pinyin/services/buildPinyin";

import { Hanzi_old } from "..";
import { addHanziAction } from "../services/actions";
import { createNewHanzi, isValidHanziFormData } from "../services/util";

const HanziForm = () => {
  const [value, setValue] = useState<
    Pick<Hanzi_old, "form"> & {
      pinyinStr: string;
      pinyin: Pinyin;
    }
  >({
    pinyinStr: "",
    pinyin: { consonant: "", vowel: "", tone: "" },
    form: "",
  });

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
    setValue({
      form: "",
      pinyin: { consonant: "", vowel: "", tone: "" },
      pinyinStr: "",
    });
  };

  return (
    <form className="w-full max-w-md space-y-4" action={handleSubmit}>
      <div className="text-4xl font-bold">漢字登録</div>
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
      <div className="bg-yellow-100 bg-opacity-40 p-5 font-light tracking-wide">
        <b>TODO:</b>入力が重複しないようにチェック🚓
      </div>
      <div className="text-right">
        <Button
          type="submit"
          className="focus-visible:bg-main-600"
          disabled={!isValidHanziFormData(value.form, value.pinyin)}
        >
          Create New Hanzi_old
        </Button>
      </div>
    </form>
  );
};

export default HanziForm;
