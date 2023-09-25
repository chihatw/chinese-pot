import PinyinForm from "./components/PinyinForm";
import PinyinLine from "./components/PinyinLine";
import PinyinList from "./components/PinyinList";
import { ONE_CHAR_CONSONANTS } from "./constants/oneCharConsonants";
import { TONES } from "./constants/tones";
import { TWO_CHAR_CONSONANTS } from "./constants/twoCharConsonants";
import {
  HALF_VOWELS,
  MAJOR_FULL_VOWELS,
  MINOR_FULL_VOWELS,
  VOWELS,
} from "./constants/vowels";
import { Pinyin, VowelType } from "./schema";

const CONSONANTS = [...ONE_CHAR_CONSONANTS, ...TWO_CHAR_CONSONANTS];

export {
  CONSONANTS,
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
};

export type { Pinyin, VowelType };
