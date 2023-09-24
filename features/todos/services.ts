import { dbAdmin } from "@/firebase/admin";
import { FirestoreDataConverter } from "firebase-admin/firestore";

const COLLECTION = "todos";

export const getTodosAdmin = async () => {
  const snapshot = await dbAdmin
    .collection(COLLECTION)
    .withConverter(todoConverter)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

export const addTodo = async (todo: Todo) => {
  await dbAdmin
    .collection(COLLECTION)
    .withConverter(todoConverter)
    .doc(todo.id)
    .set(todo);
};

export const removeTodo = async (id: string) => {
  await dbAdmin.collection(COLLECTION).doc(id).delete();
};

const todoConverter: FirestoreDataConverter<Todo> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      uid: data.uid,
      title: data.title,
      id: snapshot.id,
    };
  },
  toFirestore(todo) {
    return todo;
  },
};
