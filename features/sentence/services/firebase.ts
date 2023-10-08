import { Hanzi } from "@/features/hanzi";
import { hanziConverter } from "@/features/hanzi/services/firebase";
import { getInvertedIndexesByForms } from "@/features/invertedIndex";
import { invertedIndexConverter } from "@/features/invertedIndex/services/firebase";
import { Sentence } from "@/features/sentence";
import { dbAdmin } from "@/firebase/admin";
import { FieldValue, FirestoreDataConverter } from "firebase-admin/firestore";
import { nanoid } from "nanoid";

const COLLECTION = "sentences";

export const batchAddSentences = async (sentences: Sentence[]) => {
  console.log("batch add sentences");
  const batch = dbAdmin.batch();
  for (const sentence of sentences) {
    batch.set(
      dbAdmin
        .collection(COLLECTION)
        .withConverter(sentenceConverter)
        .doc(sentence.id),
      sentence,
    );
  }
  await batch.commit();
};

export const addSentence = async (sentence: Sentence, hanzis: Hanzi[]) => {
  // invertedIndexes
  const forms = [...new Set(sentence.text.split(""))];
  const invertedIndexes = await getInvertedIndexesByForms(forms);

  const batch = dbAdmin.batch();

  for (const form of forms) {
    const invertedIndex = invertedIndexes.find((i) => i.form === form);
    if (!invertedIndex) {
      const id = nanoid(8);
      batch.set(
        dbAdmin
          .collection("invertedIndexes")
          .withConverter(invertedIndexConverter)
          .doc(id),
        {
          id,
          form,
          count: 1,
          sentenceIds: [sentence.id],
        },
      );
    } else {
      batch.update(
        dbAdmin
          .collection("invertedIndexes")
          .withConverter(invertedIndexConverter)
          .doc(invertedIndex.id),
        {
          count: FieldValue.increment(1),
          sentenceIds: FieldValue.arrayUnion(sentence.id),
        },
      );
    }
  }

  for (const hanzi of hanzis) {
    // note converter が機能せず、id や pinyin がそのまま 登録されるので、手動で変換
    batch.update(dbAdmin.collection("hanzis").doc(hanzi.id), {
      consonant: hanzi.pinyin.consonant,
      count: hanzi.count,
      form: hanzi.form,
      latestSentenceId: hanzi.latestSentenceId,
      tone: hanzi.pinyin.tone,
      vowel: hanzi.pinyin.vowel,
    });
  }

  batch.set(
    dbAdmin
      .collection("sentences")
      .withConverter(sentenceConverter)
      .doc(sentence.id),
    sentence,
  );
  batch.commit();
};

export const removeSentence = async (sentence: Sentence, hanzis: Hanzi[]) => {
  // invertedIndexes
  const forms = [...new Set(sentence.text.split(""))];
  const invertedIndexes = await getInvertedIndexesByForms(forms);

  const batch = dbAdmin.batch();

  for (const form of forms) {
    const invertedIndex = invertedIndexes.find((i) => i.form === form);
    if (!invertedIndex) throw new Error("invertedIndex cannot find");
    batch.update(
      dbAdmin
        .collection("invertedIndexes")
        .withConverter(invertedIndexConverter)
        .doc(invertedIndex.id),
      {
        count: FieldValue.increment(-1),
        sentenceIds: FieldValue.arrayRemove(sentence.id),
      },
    );
  }

  for (const hanzi of hanzis) {
    batch.update(
      dbAdmin.collection("hanzis").withConverter(hanziConverter).doc(hanzi.id),
      {
        count: FieldValue.increment(-1),
        latestSentenceId: "",
      },
    );
  }

  batch.delete(
    dbAdmin
      .collection("sentences")
      .withConverter(sentenceConverter)
      .doc(sentence.id),
  );
  try {
    batch.commit();
  } catch (e) {
    console.log(e);
  }
};

const sentenceConverter: FirestoreDataConverter<Sentence> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      text: data.text,
      pinyinsStr: data.pinyinsStr,
      createdAt: data.createdAt,
    };
  },
  toFirestore(sentence) {
    return {
      text: sentence.text,
      pinyinsStr: sentence.pinyinsStr,
      createdAt: sentence.createdAt,
    };
  },
};
