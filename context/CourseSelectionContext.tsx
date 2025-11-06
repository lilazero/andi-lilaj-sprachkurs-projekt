"use client";

import { createContext } from "react";

interface CartContextType {
  totalPersons: number;
}

export const CartContext = createContext<CartContextType>({
  totalPersons: 0,
});

export function CartProvider({
  children,
  totalPersons,
}: {
  children: React.ReactNode;
  totalPersons: number;
}) {
  return (
    <CartContext.Provider value={{ totalPersons }}>
      {children}
    </CartContext.Provider>
  );
}
