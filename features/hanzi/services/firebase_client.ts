import { Pinyin, PinyinFilter } from "@/features/pinyin";
import { dbClient } from "@/firebase/client";
import {
  FirestoreDataConverter,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Hanzi } from "..";

const COLLECTION = "hanzis";

export const getHanzisByPinyinFilter_client = async (filter: PinyinFilter) => {
  // https://stackoverflow.com/questions/54310312/conditional-where-clause-in-firestore-queries-based-on-parameters
  let q = query(collection(dbClient, COLLECTION).withConverter(converter));

  if (filter.consonants.length) {
    q = query(q, where("consonant", "in", filter.consonants));
  }

  if (filter.vowels.length) {
    q = query(q, where("vowel", "in", filter.vowels));
  }

  if (filter.tone) {
    q = query(q, where("tone", "==", filter.tone));
  }

  console.log("get hanzis by pinyin filter");
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
};

const converter: FirestoreDataConverter<Hanzi> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      form: data.form,
      pinyin: {
        tone: data.tone,
        vowel: data.vowel,
        consonant: data.consonant,
      },
      count: data.count,
      latestSentenceId: data.latestSentenceId,
    };
  },
  toFirestore(hanzi) {
    const pinyin = hanzi.pinyin as Pinyin;
    return {
      form: hanzi.form,
      tone: pinyin.tone,
      vowel: pinyin.vowel,
      consonant: pinyin.consonant,
      count: hanzi.count,
      latestSentenceId: hanzi.latestSentenceId,
    };
  },
};
