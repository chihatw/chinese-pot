"use client";

import { useSession } from "next-auth/react";

const ClientSession = () => {
  const session = useSession();
  return (
    <div>
      <div className="grid place-items-center text-2xl font-extrabold">
        Client Session
      </div>
      <div className="max-w-sm overflow-x-scroll">
        {session.data?.user ? (
          <pre>{JSON.stringify(session.data.user, null, 2)}</pre>
        ) : (
          <pre>{JSON.stringify({ session: "undefined" }, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default ClientSession;
