import { createContext, useContext, useState, ReactNode } from "react";

export interface CheckoutData {
  activityId: string;
  activityName: string;
  category: string;
  categoryColor: string;
  date: string;
  time: string;
  room: string;
  pricePerTicket: number;
  serviceFee: number;
  quantity: number;
  spotsRemaining: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  acceptedTerms: boolean;
  paymentMethod: "payphone" | "kushki" | "nuvei" | null;
  generatedTicketId?: string;
  generatedTicketNumber?: string;
}

const defaultData: CheckoutData = {
  activityId: "act-taller-1",
  activityName: "Taller: Temperado de Chocolate Artesanal",
  category: "Taller",
  categoryColor: "#aab93e",
  date: "Jue 14 Jun",
  time: "11:00 AM",
  room: "Sala Taller A",
  pricePerTicket: 25,
  serviceFee: 0,
  quantity: 1,
  spotsRemaining: 2,
  buyerName: "María Andrade",
  buyerEmail: "maria@chokao.ec",
  buyerPhone: "+593 99 123 4567",
  acceptedTerms: false,
  paymentMethod: null,
};

interface Ctx {
  data: CheckoutData;
  update: (patch: Partial<CheckoutData>) => void;
  reset: () => void;
}

const CheckoutContext = createContext<Ctx | null>(null);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<CheckoutData>(defaultData);
  const update = (patch: Partial<CheckoutData>) => setData((d) => ({ ...d, ...patch }));
  const reset = () => setData(defaultData);
  return (
    <CheckoutContext.Provider value={{ data, update, reset }}>{children}</CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside CheckoutProvider");
  return ctx;
};

export const calcTotal = (d: CheckoutData) => d.pricePerTicket * d.quantity + d.serviceFee;
