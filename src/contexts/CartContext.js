import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // const [cartState, setCartState] = useState({ cart: {}, wishlist: [1, 2, 3] });

  const [cartState, dispatch] = useReducer(
    (prevCartState, action) => {
      return { ...prevCartState };
    },
    { cart: {}, wishlist: [1, 2, 3] }
  );

  return (
    <CartContext.Provider value={{ cartState }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export { CartContext };
