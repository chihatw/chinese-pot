import { Pinyin, PinyinFilter, VOWEL_PAIRS } from "@/features/pinyin";
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

export const getConsonantCounts = (hanzis: Hanzi[]) => {
  return hanzis.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.pinyin.consonant]: (acc[cur.pinyin.consonant] || 0) + 1,
    }),
    {} as { [key: string]: number },
  );
};

export const getVowelCounts = (hanzis: Hanzi[]) => {
  return hanzis.reduce(
    (acc, cur) => {
      let vowel = cur.pinyin.vowel;

      // 弱母音の場合、子音ありの形に統一して計上する
      const pair = Object.entries(VOWEL_PAIRS)
        .filter(([, value]) => value === vowel)
        ?.at(0);
      if (pair) {
        vowel = pair.at(0)!;
      }
      return {
        ...acc,
        [vowel]: (acc[vowel] || 0) + 1,
      };
    },
    {} as { [key: string]: number },
  );
};

export const getToneCounts = (hanzis: Hanzi[]) => {
  return hanzis.reduce(
    (acc, cur) => {
      return {
        ...acc,
        [cur.pinyin.tone]: (acc[cur.pinyin.tone] || 0) + 1,
      };
    },
    {} as { [key: string]: number },
  );
};

export const getCorrectVowel = (vowel: string, consonant: string) => {
  const pair = VOWEL_PAIRS[vowel as keyof typeof VOWEL_PAIRS];
  // 弱母音で子音がない場合、語頭型を使う
  if (!!pair && !consonant) {
    vowel = pair;
  }
  return vowel;
};

export const getHanzisByVowel = (hanzis: Hanzi[], vowel: string) => {
  return hanzis.filter((hanzi) => {
    const target: string[] = [vowel];
    const pair = VOWEL_PAIRS[vowel as keyof typeof VOWEL_PAIRS];
    !!pair && target.push(pair);
    return target.includes(hanzi.pinyin.vowel);
  });
};

export const filterPinyin = (hanzi: Hanzi, filter: PinyinFilter) => {
  const pinyin = hanzi.pinyin;

  if (!!filter.consonants.length) {
    if (!filter.consonants.includes(pinyin.consonant)) return false;
  }

  if (!!filter.vowels.length) {
    if (!filter.vowels.includes(pinyin.vowel)) return false;
  }

  if (!!filter.tone) {
    if (pinyin.tone !== filter.tone) return false;
  }

  return true;
};
