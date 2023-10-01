import { getSentencesByIds } from "@/features/sentence/services/firebase";
import { dbAdmin } from "@/firebase/admin";
import { FirestoreDataConverter } from "firebase-admin/firestore";
import { SentenceUnigram } from "..";

const COLLECTION = "sentenceUnigrams";

export const getSentenceUnigramsCount = async () => {
  console.log("get sentence unigrams count");
  const snapshot = await dbAdmin.collection(COLLECTION).count().get();
  return snapshot.data().count;
};

export const getSentencesByOneForm = async (form: string) => {
  // 引数チェック
  if (!form) return [];

  const sentenceUnigrams = await getSentenceUnigramsByForm(form);

  const sentenceIds = sentenceUnigrams
    .map((unigram) => unigram.sentenceId)
    .filter((item, index, self) => self.indexOf(item) === index);

  const sentences = await getSentencesByIds(sentenceIds);
  return sentences;
};

export const getSentencesByForms = async (forms: string) => {
  // 空文字は省く
  forms = forms.trim();

  // 検索項目がなければ、中止
  if (!forms) return [];

  const sentenceIds = await getSentenceIdsByForms(forms);
  const sentences = await getSentencesByIds(sentenceIds);
  return sentences;
};

const getSentenceIdsByForms = async (forms: string): Promise<string[]> => {
  if (!forms.length) return [];

  // 1文字目の検索（条件: form）
  const head = forms.at(0)!;
  const sentenceUnigrams = await getSentenceUnigramsByForm(head);
  if (forms.length === 1)
    return sentenceUnigrams.map((unigram) => unigram.sentenceId);

  // 2文字目以降の検索（条件: sentenceId, offset, form）
  let targetUnigrams: SentenceUnigram[] = [...sentenceUnigrams];
  for (let i = 1; i < forms.length; i++) {
    const form = forms.at(i)!;
    let tempUnigrams: SentenceUnigram[] = [];
    for (const unigram of targetUnigrams) {
      const offsetUnigram = await getOffsetUnigram(
        unigram.sentenceId,
        unigram.offset + i,
      );
      // 条件に合うものは temp に入れる
      if (offsetUnigram && offsetUnigram.form === form) {
        tempUnigrams.push(unigram);
      }
    }
    // 条件に合ったものを target に移す
    targetUnigrams = [...tempUnigrams];
    // temp は空に
    tempUnigrams = [];
  }

  return targetUnigrams.map((unigram) => unigram.sentenceId);
};

const getOffsetUnigram = async (sentenceId: string, offset: number) => {
  console.log(`get sentenceUnigram by id:${sentenceId} offset:${offset}`);
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(SentenceUnigramConvertor)
    .where("sentenceId", "==", sentenceId)
    .where("offset", "==", offset)
    .get();
  return snapshot.docs.map((doc) => doc.data())[0];
};

const getSentenceUnigramsByForm = async (form: string) => {
  console.log(`get sentenceUnigrams by ${form}`);
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(SentenceUnigramConvertor)
    .where("form", "==", form)
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

export const batchAddSentenceUnigrams = async (unigrams: SentenceUnigram[]) => {
  const batch = dbAdmin.batch();
  for (const unigram of unigrams) {
    batch.set(
      dbAdmin
        .collection(COLLECTION)
        .withConverter(SentenceUnigramConvertor)
        .doc(unigram.id),
      unigram,
    );
  }
  console.log("batch add sentence unigrams");
  await batch.commit();
};

const SentenceUnigramConvertor: FirestoreDataConverter<SentenceUnigram> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      form: data.form,
      offset: data.offset,
      sentenceId: data.sentenceId,
    };
  },
  toFirestore(sentenceUnigram) {
    return {
      form: sentenceUnigram.form,
      offset: sentenceUnigram.offset,
      sentenceId: sentenceUnigram.sentenceId,
    };
  },
};
