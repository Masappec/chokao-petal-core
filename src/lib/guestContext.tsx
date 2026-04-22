import { createContext, useContext, useState, ReactNode } from "react";

interface GuestCtx {
  isGuest: boolean;
  setGuest: (v: boolean) => void;
  userEmail: string;
}

const Ctx = createContext<GuestCtx | null>(null);

export const GuestProvider = ({ children }: { children: ReactNode }) => {
  // Por defecto: usuario logueado. Cambiar a true para probar modo invitado.
  const [isGuest, setGuest] = useState<boolean>(false);
  const userEmail = "maria@chokao.ec";
  return <Ctx.Provider value={{ isGuest, setGuest, userEmail }}>{children}</Ctx.Provider>;
};

export const useGuest = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useGuest must be used inside GuestProvider");
  return c;
};
