import { Pinyin, PinyinFilter } from "@/features/pinyin";
import { dbAdmin } from "@/firebase/admin";
import { FirestoreDataConverter, Query } from "firebase-admin/firestore";
import { Hanzi } from "../schema";

const COLLECTION = "hanzis";

export const getHanzisCount = async () => {
  console.log("get hanzis count");
  const snapshot = await dbAdmin.collection(COLLECTION).count().get();
  return snapshot.data().count;
};
export const getHanzis = async () => {
  console.log("get hanzis");
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(hanziConverter)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

export const getHanzisByForms = async (forms: string[]) => {
  console.log("get hanzis by forms");
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(hanziConverter)
    .where("form", "in", forms)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

export const getHanzisByPinyinFilter = async (filter: PinyinFilter) => {
  // https://stackoverflow.com/questions/54310312/conditional-where-clause-in-firestore-queries-based-on-parameters
  let q = dbAdmin.collection(COLLECTION).withConverter(hanziConverter) as Query;

  if (filter.consonants.length) {
    q = q.where("consonant", "in", filter.consonants);
  }

  if (filter.vowels.length) {
    q = q.where("vowel", "in", filter.vowels);
  }

  if (filter.tone) {
    q = q.where("tone", "==", filter.tone);
  }

  console.log("get hanzis by pinyin filter");
  const snapshot = await q.get();

  return snapshot.docs.map((doc) => doc.data());
};

export const batchAddHanzis = async (hanzis: Hanzi[]) => {
  const batch = dbAdmin.batch();
  for (const hanzi of hanzis) {
    batch.set(
      dbAdmin
        .collection(COLLECTION)
        .withConverter(hanziConverter)
        .doc(hanzi.id),
      hanzi,
    );
  }
  await batch.commit();
};

export const addHanzi = async (hanzi: Hanzi) => {
  await dbAdmin
    .collection(COLLECTION)
    .withConverter(hanziConverter)
    .doc(hanzi.id)
    .set(hanzi);
};

export const hanziConverter: FirestoreDataConverter<Hanzi> = {
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
