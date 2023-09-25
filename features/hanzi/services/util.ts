import { Pinyin } from "@/features/pinyin";
import { isValidPinyin } from "@/features/pinyin/services/buildPinyin";
import { nanoid } from "nanoid";
import { Hanzi } from "..";

export const isValidHanziFormData = (
  form: string,
  pinyin: Pinyin | undefined,
) => {
  if (!pinyin) return false;
  if (!isValidPinyin(pinyin)) return false;
  if (form.length !== 1) return false;
  if (form.replace(/[a-z]/gi, "").length !== 1) return false;
  return true;
};

export const createNewHanzi = (value: Omit<Hanzi, "id">) => {
  const newHanzi: Hanzi = {
    id: nanoid(8),
    form: value.form,
    pinyin: value.pinyin!,
  };
  return newHanzi;
};
