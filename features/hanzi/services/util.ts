import { Pinyin, PinyinFilter, VOWEL_PAIRS } from "@/features/pinyin";
import {
  buildPinyin,
  isValidPinyin,
} from "@/features/pinyin/services/buildPinyin";
import { SENTENCES } from "@/features/sentenceSeeds";
import { HANZI_SENTENCE_RELATIONS, Hanzi } from "..";
import { EMPTY_PINYIN_MARK } from "../constants";

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

export function getConsonantCounts(hanzis: Hanzi[]) {
  return hanzis.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.pinyin.consonant]: (acc[cur.pinyin.consonant] || 0) + 1,
    }),
    {} as { [key: string]: number },
  );
}

export function getVowelCounts(hanzis: Hanzi[]) {
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
}

export function getToneCounts(hanzis: Hanzi[]) {
  return hanzis.reduce(
    (acc, cur) => {
      return {
        ...acc,
        [cur.pinyin.tone]: (acc[cur.pinyin.tone] || 0) + 1,
      };
    },
    {} as { [key: string]: number },
  );
}

export function getCorrectVowel(vowel: string, consonant: string) {
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
}

export function getHanzisByVowel(hanzis: Hanzi[], vowel: string) {
  return hanzis.filter((hanzi) => {
    const target: string[] = [vowel];
    const pair = VOWEL_PAIRS[vowel];
    !!pair && target.push(pair);
    return target.includes(hanzi.pinyin.vowel);
  });
}

export function filterPinyin(hanzi: Hanzi, filter: PinyinFilter) {
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
}

export function buildFormUniqHanzis(hanzis: Hanzi[]) {
  return hanzis
    .map((i) => i.form)
    .filter((item, index, self) => self.indexOf(item) === index)
    .map((form) => hanzis.find((hanzi) => hanzi.form === form)!);
}

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
  // hanzi が語頭と語中で形の変わる母音の語中の形の場合、語頭の形を取得する
  const pair_key = Object.keys(VOWEL_PAIRS).find(
    (key) => VOWEL_PAIRS[key] === hanzi.pinyin.vowel,
  );

  // 同様に、hanzi が語頭と語中で形の変わる母音の語頭の形の場合、語中の形も取得する
  const pair_value = VOWEL_PAIRS[hanzi.pinyin.vowel];

  // hanzi のリストから母音が同じものを厳選する
  // ただし、語頭形がある場合、語中形がある場合は、それも母音に含める
  const differentConsonants = db.filter(
    (item) =>
      [hanzi.pinyin.vowel, pair_key, pair_value].includes(item.pinyin.vowel) &&
      item.pinyin.tone === hanzi.pinyin.tone &&
      item.form !== hanzi.form,
  );

  // 抽出された hanzi を子音ごとにまとめる
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

export function buildToneMark(tone?: string) {
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
}

export const buildSentenceHanzis = () => {
  const sentences = SENTENCES;

  const result: {
    sentenceId: string;
    hanziId: string;
  }[] = [];

  for (const sentence of sentences) {
    const chars = sentence.text.split("");
    const pinyinStrs = sentence.pinyinsStr.split(" ");
    if (chars.length === pinyinStrs.length) {
      for (let i = 0; i < chars.length; i++) {
        const form = chars[i];
        const pinyinStr = pinyinStrs[i];
        const hanzi = {
          form,
          pinyin: buildPinyin(pinyinStr),
        };
        const hanziId = buildHanziId(hanzi.form, hanzi.pinyin);
        result.push({
          sentenceId: sentence.id,
          hanziId,
        });
      }
    } else {
      console.log(`something wrong: ${JSON.stringify(sentence)}`);
    }
  }
  return result;
};

export const buildHanziSentenceRelations = () => {
  const sentenceId_hanziIds = buildSentenceHanzis();

  return sentenceId_hanziIds.reduce(
    (acc, cur) => {
      acc[cur.hanziId] = acc[cur.hanziId]
        ? [...acc[cur.hanziId], cur.sentenceId] // 重複そのまま
        : [cur.sentenceId];
      return acc;
    },
    {} as { [key: string]: string[] },
  );
};

const getLatestSentence = (sentenceIds: string[]) => {
  return SENTENCES.filter((s) => sentenceIds.includes(s.id))
    .sort((a, b) => b.createdAt - a.createdAt)
    .at(0)!;
};

export const buildHanziId = (form: string, pinyin: Pinyin) => {
  let id = form.charCodeAt(0).toString(16).padStart(5, "0");
  id += pinyin.consonant || EMPTY_PINYIN_MARK;
  id += pinyin.vowel || EMPTY_PINYIN_MARK;
  id += pinyin.tone || EMPTY_PINYIN_MARK;
  return id;
};

export const buildHanziFromId = (hanziId: string) => {
  const charCode_16 = hanziId.slice(0, 5).replace(/^0+/, "");
  const charCode = parseInt(charCode_16, 16);
  const char = String.fromCharCode(charCode);

  const regexPattern = new RegExp(EMPTY_PINYIN_MARK, "g");

  const pinyinStr = hanziId.substring(5).replace(regexPattern, "");
  const hanzi: Hanzi = {
    id: hanziId,
    form: char,
    pinyin: buildPinyin(pinyinStr),
    count: 0,
    latestSentenceId: "",
  };
  return hanzi;
};

export const buildHanzis = () => {
  const hanzis: Hanzi[] = [];
  const relations = HANZI_SENTENCE_RELATIONS;

  for (const hanziId of Object.keys(relations)) {
    const sentenceIds = relations[hanziId];
    const sentence = getLatestSentence(sentenceIds);

    const { form, pinyin } = buildHanziFromId(hanziId);

    const hanzi: Hanzi = {
      id: hanziId,
      form,
      pinyin,
      count: sentenceIds.length,
      latestSentenceId: sentence.id,
    };
    hanzis.push(hanzi);
  }
  return hanzis;
};
