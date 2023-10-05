import { Pinyin } from "@/features/pinyin";
import { dbAdmin } from "@/firebase/admin";
import { FirestoreDataConverter } from "firebase-admin/firestore";
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
    .withConverter(converter)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

export const getHanzisByForms = async (forms: string[]) => {
  console.log("get hanzis by forms");
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(converter)
    .where("form", "in", forms)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

export const batchAddHanzis = async (hanzis: Hanzi[]) => {
  const batch = dbAdmin.batch();
  for (const hanzi of hanzis) {
    batch.set(
      dbAdmin.collection(COLLECTION).withConverter(converter).doc(hanzi.id),
      hanzi,
    );
  }
  console.log("batch add hanzis");
  await batch.commit();
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
