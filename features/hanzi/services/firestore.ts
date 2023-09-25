import { Pinyin } from "@/features/pinyin";
import { dbAdmin } from "@/firebase/admin";
import { FirestoreDataConverter } from "firebase-admin/firestore";
import { Hanzi, HanziMeta } from "..";

const COLLECTION = "hanzis";
const COLLECTION_META = "hanzisMeta";

export const addHanzi = async (hanzi: Hanzi) => {
  await dbAdmin
    .collection(COLLECTION)
    .withConverter(hanziConverter)
    .doc(hanzi.id)
    .set(hanzi);

  await dbAdmin
    .collection(COLLECTION_META)
    .withConverter(hanziMetaConverter)
    .doc(hanzi.id)
    .set({
      id: hanzi.id,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });
};

const hanziConverter: FirestoreDataConverter<Hanzi> = {
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
    };
  },
  toFirestore(hanzi) {
    const pinyin = hanzi.pinyin as Pinyin;

    return {
      form: hanzi.form,
      tone: pinyin.tone,
      vowel: pinyin.vowel,
      consonant: pinyin.consonant,
    };
  },
};

const hanziMetaConverter: FirestoreDataConverter<HanziMeta> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      createdAt: data.createdAt,
      updatedAt: data.createdAt,
    };
  },
  toFirestore(hanziMeta) {
    const { id, ...other } = hanziMeta;
    return other;
  },
};
