"use client";
import { ReactNode, createContext, useContext } from "react";
import { Hanzi } from "../..";

type HanzisContext = { hanzis: Hanzi[] };

const HanzisContext = createContext<HanzisContext | null>(null);

export const useHanzis = () => {
  const context = useContext(HanzisContext);
  if (!context) throw new Error("no context");
  return context;
};

const HanzisContextProvider = ({
  children,
  hanzis,
}: {
  children: ReactNode;
  hanzis: Hanzi[];
}) => {
  return (
    <HanzisContext.Provider value={{ hanzis }}>
      {children}
    </HanzisContext.Provider>
  );
};

export default HanzisContextProvider;
