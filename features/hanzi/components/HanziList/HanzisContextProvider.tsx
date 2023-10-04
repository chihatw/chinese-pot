"use client";
import { ReactNode, createContext, useContext } from "react";
import { Hanzi_old } from "../..";

type HanzisContext = { hanzis: Hanzi_old[] };

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
  hanzis: Hanzi_old[];
}) => {
  return (
    <HanzisContext.Provider value={{ hanzis }}>
      {children}
    </HanzisContext.Provider>
  );
};

export default HanzisContextProvider;
