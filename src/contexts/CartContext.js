import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  let initialCart = {
    cart: {
      prod1: {
        name: "kala chasma",
        price: 1000,
        quantity: 1,
      },
      prod2: {
        name: "kali aankhein",
        price: 1250,
        quantity: 1,
      },
      prod3: {
        name: "laal chhadi",
        price: 500,
        quantity: 1,
      },
      prod4: {
        name: "jalebi",
        price: 50,
        quantity: 1,
      },
      prod5: {
        name: "japani joota",
        price: 10000,
        quantity: 1,
      },
    },
    wishlist: ["prod1", "prod2"],
    total: 0,
  };

  const [state, dispatch] = useReducer((state, action) => {
    const { type } = action;
    const { id } = action.payload;
    let obj = state.cart[id];
    let newCart = {};
    let newTotal = 0;

    const calculateTotal = () => {
      const cart = state.cart;
      let newTotal = Object.keys(cart).reduce(function (previous, key) {
        return previous + cart[key].price * cart[key].quantity;
      }, 0);
      return newTotal;
    };

    switch (type) {
      case "ADD-TO-CART":
        console.log("add to cart switch");

        newCart = {
          ...state.cart,
          [id]: { ...obj, quantity: obj.quantity + 1 },
        };
        newTotal = calculateTotal();

        return {
          ...state,
          cart: newCart,
          total: newTotal,
        };

      case "SUBTRACT-FROM-CART":
        console.log("subtract from cart switch");

        let newQuantity = obj.quantity <= 0 ? 0 : obj.quantity - 1;

        newCart = {
          ...state.cart,
          [id]: { ...obj, quantity: newQuantity },
        };

        return {
          ...state,
          cart: newCart,
        };

      case "REMOVE-FROM-CART":
        console.log("remove from cart switch");
        return state;

      case "TOGGLE-WISHLIST":
        console.log("toggle wishlist switch");
        return state;

      case "UPDATE-TOTAL":
        newTotal = calculateTotal();
        return {
          ...state,
          total: newTotal,
        };

      default:
        break;
    }
  }, initialCart);

  // using useEffect to calculate total of all items in cart
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    console.log("useEffect run on render");
    let cart = state.cart;
    let total = Object.keys(cart).reduce(function (previous, key) {
      return previous + cart[key].price * cart[key].quantity;
    }, 0);
    setCartTotal(total);
  }, [state]);

  return (
    <CartContext.Provider
      value={{ state: state, dispatch: dispatch, cartTotal: cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export { CartContext };
