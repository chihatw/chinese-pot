import { Pinyin } from "@/features/pinyin";
import { dbAdmin } from "@/firebase/admin";

import { FirestoreDataConverter } from "firebase-admin/firestore";
import { Hanzi } from "../schema";

const COLLECTION = "hanzis";

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
