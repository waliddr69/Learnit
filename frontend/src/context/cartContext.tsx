import { createContext, useContext, useEffect, useState } from "react";

import type { Cart } from "@/types/cart";
import { getCart } from "@/services/cartService";
import { useAuth } from "./authContext";

type CartContextType = {
  cart: Cart[];
  
  refreshCart: (cId: number|undefined) => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  
  refreshCart: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart[] >([]);
  const {user,refreshUser} = useAuth()
  async function loadCart(cId?:number|undefined) {
      try {
        const cart = await getCart(user!.id,cId);
        setCart(cart);
      } catch (error) {
        setCart([]);
      }

    }

    const refresh = async()=>{
        await refreshUser()
    }

  useEffect(()=>{
    refresh()
  },[])
  useEffect(() => {
    
    if(user) loadCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cart,refreshCart:loadCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}