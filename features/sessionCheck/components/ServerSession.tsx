"server only";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

const ServerSession = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ServerSessionContent />
    </Suspense>
  );
};

export default ServerSession;

const ServerSessionContent = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="grid place-items-center text-2xl font-extrabold">
        Server Session
      </div>
      <div className="max-w-sm overflow-x-scroll">
        {session?.user ? (
          <pre>{JSON.stringify(session.user, null, 2)}</pre>
        ) : (
          <pre>{JSON.stringify({ session: "undefined" }, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};
