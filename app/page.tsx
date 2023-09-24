"server only";

import { FirebaseAuthCheck } from "@/features/firebaseAuthCheck";
import { ClientSession, ServerSession } from "@/features/sessionCheck";
import { TodoForm, TodoList } from "@/features/todos";

export default async function Home() {
  return (
    <main className="mx-[10vw] w-[calc(100%-20vw)] py-28 sm:mx-auto sm:w-[min(800px,100%-120px)]">
      <div className="grid  place-items-center gap-y-8 ">
        <div className="w-full max-w-sm space-y-6">
          <TodoList />
          <TodoForm />
        </div>
        <ServerSession />
        <ClientSession />
        <FirebaseAuthCheck />
      </div>
    </main>
  );
}
