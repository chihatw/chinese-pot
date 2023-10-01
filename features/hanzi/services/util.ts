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
  const pair_value = VOWEL_PAIRS[vowel];
  const pair_key = Object.keys(VOWEL_PAIRS).find(
    (key) => VOWEL_PAIRS[key] === vowel,
  );
  // 弱母音で子音がない場合、語頭型を使う
  if (!!pair_value && !consonant) {
    vowel = pair_value;
  }
  // 弱母音で子音がある場合、語中型を使う
  else if (!!pair_key && !!consonant) {
    vowel = pair_key;
  }

  return vowel;
};

export const getHanzisByVowel = (hanzis: Hanzi[], vowel: string) => {
  return hanzis.filter((hanzi) => {
    const target: string[] = [vowel];
    const pair = VOWEL_PAIRS[vowel];
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

export const buildFormUniqHanzis = (hanzis: Hanzi[]) => {
  return hanzis
    .map((i) => i.form)
    .filter((item, index, self) => self.indexOf(item) === index)
    .map((form) => hanzis.find((hanzi) => hanzi.form === form)!);
};

export const getDifferentTones = (db: Hanzi[], hanzi: Hanzi) => {
  return db
    .filter(
      (item) =>
        item.pinyin.consonant === hanzi.pinyin.consonant &&
        item.pinyin.vowel === hanzi.pinyin.vowel &&
        item.form !== hanzi.form,
    )
    .reduce(
      (acc, cur) => ({
        ...acc,
        [cur.pinyin.tone]: acc[cur.pinyin.tone]
          ? [...acc[cur.pinyin.tone], cur]
          : [cur],
      }),
      {} as { [key: string]: Hanzi[] },
    );
};

export const getDifferentConsonants = (db: Hanzi[], hanzi: Hanzi) => {
  // 弱母音
  const pair_key = Object.keys(VOWEL_PAIRS)
    .find((key) => VOWEL_PAIRS[key] === hanzi.pinyin.vowel)
    ?.at(0);
  const pair_value = VOWEL_PAIRS[hanzi.pinyin.vowel];

  let differentConsonants = db.filter(
    (item) =>
      [hanzi.pinyin.vowel, pair_key, pair_value].includes(item.pinyin.vowel) &&
      item.pinyin.tone === hanzi.pinyin.tone &&
      item.form !== hanzi.form,
  );

  return differentConsonants.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.pinyin.consonant]: acc[cur.pinyin.consonant]
        ? [...acc[cur.pinyin.consonant], cur]
        : [cur],
    }),
    {} as { [key: string]: Hanzi[] },
  );
};

export const buildToneMark = (tone?: string) => {
  switch (tone) {
    case "1":
      return "‾";
    case "2":
      return "ˊ";
    case "3":
      return "ˇ";
    case "4":
      return "ˋ";
    case "0":
      return "•";
    default:
      return "";
  }
};
