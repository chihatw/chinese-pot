import PinyinForm from "./components/PinyinForm";
import PinyinLine from "./components/PinyinLine";
import PinyinList from "./components/PinyinList";
import {
  ONE_CHAR_CONSONANTS,
  TWO_CHAR_CONSONANTS,
} from "./constants/consonants";
import { TONES } from "./constants/tones";

import {
  EXTROVERTED_VOWELS,
  HALF_VOWELS,
  INTROVERTED_VOWELS,
  MAJOR_FULL_VOWELS,
  MINOR_FULL_VOWELS,
  VOWELS,
  VOWEL_PAIRS,
} from "./constants/vowels";
import { Pinyin, VowelType } from "./schema";

const CONSONANTS = [...ONE_CHAR_CONSONANTS, ...TWO_CHAR_CONSONANTS];

export {
  CONSONANTS,
  EXTROVERTED_VOWELS,
  HALF_VOWELS,
  INTROVERTED_VOWELS,
  MAJOR_FULL_VOWELS,
  MINOR_FULL_VOWELS,
  ONE_CHAR_CONSONANTS,
  PinyinForm,
  PinyinLine,
  PinyinList,
  TONES,
  TWO_CHAR_CONSONANTS,
  VOWELS,
  VOWEL_PAIRS,
};

export type { Pinyin, VowelType };
