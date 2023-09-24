"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { removeTodoAction } from "../actions";

const RemoveButton = ({ todo }: { todo: Todo }) => {
  const session = useSession();

  // 非表示処理
  if (!session.data?.user.admin && session.data?.user.uid !== todo.uid) {
    return null;
  }

  return (
    <form action={removeTodoAction}>
      <Input type="hidden" name="id" defaultValue={todo.id} />
      <Button type="submit" size="icon" variant="ghost">
        <Trash2
          size={20}
          className={session.data?.user.admin ? "text-red-500" : ""}
        />
      </Button>
    </form>
  );
};

export default RemoveButton;
