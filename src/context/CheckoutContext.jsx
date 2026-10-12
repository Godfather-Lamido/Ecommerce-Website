import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const [customer, setCustomer] = useState(null);

  return (
    <CheckoutContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used inside CheckoutProvider");
  }

  return context;
}