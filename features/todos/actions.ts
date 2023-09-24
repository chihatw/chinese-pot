"use server";

import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { addTodo, removeTodo } from "./services";

export const removeTodoAction = async (data: FormData) => {
  const id = data.get("id") as string;
  removeTodo(id);
  revalidatePath("/");
};

export const addTodoAction = async (data: FormData) => {
  const title = data.get("title") as string;
  const uid = data.get("uid") as string;
  const newTodo: Todo = {
    id: nanoid(4),
    uid: uid || "anonymous",
    title,
  };
  await addTodo(newTodo);
  revalidatePath("/");
};
