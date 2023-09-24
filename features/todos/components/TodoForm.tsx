"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { addTodoAction } from "../actions";

const TodoForm = () => {
  const session = useSession();
  const [value, setValue] = useState({ title: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let uid = session.data?.user.uid;

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    await addTodoAction(data);
    setValue((prev) => ({ ...prev, title: "" }));
  };

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit}>
      <Input
        type="hidden"
        name="uid"
        defaultValue={session.data?.user.uid || ""}
      />
      <Input
        name="title"
        className="h-12 bg-white"
        placeholder="title"
        value={value.title}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />
      <Button
        className="bg-main hover:bg-main-300 h-10 w-full"
        disabled={!value.title}
      >
        Create New Todo
      </Button>
    </form>
  );
};

export default TodoForm;
