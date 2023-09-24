"use client";

import { useAuthContext } from "@/features/auth/components/AuthContextProvider";

const FirebaseAuthCheck = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <div className="grid place-items-center text-2xl font-extrabold">
        Firebase Auth
      </div>
      <div className="max-w-sm overflow-x-scroll ">
        {user ? (
          <pre className="max-h-40">{JSON.stringify(user, null, 2)}</pre>
        ) : (
          <pre>{JSON.stringify({ user: "undefined" }, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default FirebaseAuthCheck;
