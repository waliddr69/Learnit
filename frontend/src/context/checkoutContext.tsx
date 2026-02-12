
import { createContext, useContext, useState, type ReactNode } from "react";

type CheckoutContextType = {
  allowed: boolean;
  allowCheckout: () => void;
  resetCheckout: () => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [allowed, setAllowed] = useState(false);

  const allowCheckout = () => setAllowed(true);
  const resetCheckout = () => setAllowed(false);

  return (
    <CheckoutContext.Provider value={{ allowed, allowCheckout, resetCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be inside CheckoutProvider");
  return context;
};
