import { Pinyin } from "@/features/pinyin";
import { dbAdmin } from "@/firebase/admin";
import { FirestoreDataConverter } from "firebase-admin/firestore";
import { Hanzi, HanziMeta } from "..";

const COLLECTION = "hanzis";
const COLLECTION_META = "hanzisMeta";

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

export const addHanzi = async (hanzi: Hanzi) => {
  console.log("set hanzi");
  await dbAdmin
    .collection(COLLECTION)
    .withConverter(hanziConverter)
    .doc(hanzi.id)
    .set(hanzi);

  console.log("set hanzi meta");
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
    batch.set(
      dbAdmin
        .collection(COLLECTION_META)
        .withConverter(hanziMetaConverter)
        .doc(hanzi.id),
      {
        id: hanzi.id,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      },
    );
  }
  console.log("batch add hanzis");
  await batch.commit();
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
