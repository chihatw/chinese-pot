"use client";

// https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/

import { authClient } from "@/firebase/client";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<{
  user: FirebaseUser | null;
  initializing: boolean;
}>({
  user: null,
  initializing: true,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unscribe = onAuthStateChanged(authClient, async (user) => {
      !!user && setUser(user);
      setInitializing(false);
    });
    return () => unscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};
