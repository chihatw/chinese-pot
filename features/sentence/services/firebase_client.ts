import { dbClient } from "@/firebase/client";
import { FirestoreDataConverter, doc, getDoc } from "firebase/firestore";
import { Sentence } from "../schema";

const COLLECTION = "sentences";

// debug
export const getSentence_client = async (id: string) => {
  const snapshot = await getDoc(
    doc(dbClient, COLLECTION, id).withConverter(sentenceConverter),
  );
  if (!snapshot.exists()) return;
  return snapshot.data();
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
