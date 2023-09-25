import PinyinForm from "./components/PinyinForm";
import PinyinLine from "./components/PinyinLine";
import PinyinList from "./components/PinyinList";
import {
  ONE_CHAR_CONSONANTS,
  buildOneCharConsonants,
} from "./constants/oneCharConsonants";
import { TONES } from "./constants/tones";
import { TWO_CHAR_CONSONANTS } from "./constants/twoCharConsonants";
import {
  HALF_VOWELS,
  MAJOR_FULL_VOWELS,
  MINOR_FULL_VOWELS,
  buildVowels,
} from "./constants/vowels";
import { Pinyin } from "./schema";
import {
  buildPinyin,
  buildPinyins,
  isValidPinyin,
} from "./services/buildPinyin";

const CONSONANTS = [...ONE_CHAR_CONSONANTS, ...TWO_CHAR_CONSONANTS];

const FULL_VOWELS = [...MAJOR_FULL_VOWELS, ...MINOR_FULL_VOWELS];
const VOWELS = [...FULL_VOWELS, ...HALF_VOWELS];

export {
  CONSONANTS,
  FULL_VOWELS,
  HALF_VOWELS,
  MAJOR_FULL_VOWELS,
  MINOR_FULL_VOWELS,
  ONE_CHAR_CONSONANTS,
  PinyinForm,
  PinyinLine,
  PinyinList,
  TONES,
  TWO_CHAR_CONSONANTS,
  VOWELS,
  buildOneCharConsonants,
  buildPinyin,
  buildPinyins,
  buildVowels,
  isValidPinyin,
};

export type { Pinyin };
