import React, { useEffect, useReducer, useState } from "react";
import { useCart } from "../contexts/CartContext";

const productList = [
  {
    id: "prod1",
    name: "kala chasma",
    price: 1000,
  },
  {
    id: "prod2",
    name: "kali aankhein",
    price: 1250,
  },
  {
    id: "prod3",
    name: "laal chhadi",
    price: 500,
  },
  {
    id: "prod4",
    name: "jalebi",
    price: 50,
  },
  {
    id: "prod5",
    name: "japani joota",
    price: 10000,
  },
];

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

function SampleComponent() {
  // const [state, setStateFunc] = useState(0);
  // const [state, setStateFunc] = useReducer((accumulator, value) => {}, {});
  // const [state, dispatch] = useReducer((state, value) => {}, {});

  // const [state, dispatch] = useReducer((state, action) => {
  //   const { type } = action;
  //   const { id } = action.payload;
  //   let obj = state.cart[id];
  //   let newCart = {};
  //   let newTotal = 0;

  //   const calculateTotal = () => {
  //     const cart = state.cart;
  //     let newTotal = Object.keys(cart).reduce(function (previous, key) {
  //       return previous + cart[key].price * cart[key].quantity;
  //     }, 0);
  //     return newTotal;
  //   };

  //   switch (type) {
  //     case "ADD-TO-CART":
  //       console.log("add to cart switch");

  //       newCart = {
  //         ...state.cart,
  //         [id]: { ...obj, quantity: obj.quantity + 1 },
  //       };
  //       newTotal = calculateTotal();

  //       return {
  //         ...state,
  //         cart: newCart,
  //         total: newTotal,
  //       };

  //     case "SUBTRACT-FROM-CART":
  //       console.log("subtract from cart switch");

  //       let newQuantity = obj.quantity <= 0 ? 0 : obj.quantity - 1;

  //       newCart = {
  //         ...state.cart,
  //         [id]: { ...obj, quantity: newQuantity },
  //       };

  //       return {
  //         ...state,
  //         cart: newCart,
  //       };

  //     case "REMOVE-FROM-CART":
  //       console.log("remove from cart switch");
  //       return state;

  //     case "TOGGLE-WISHLIST":
  //       console.log("toggle wishlist switch");
  //       return state;

  //     case "UPDATE-TOTAL":
  //       newTotal = calculateTotal();
  //       return {
  //         ...state,
  //         total: newTotal,
  //       };

  //     default:
  //       break;
  //   }
  // }, initialCart);

  // // setting a state to
  // const [cartTotal, setCartTotal] = useState(0);

  // useEffect(() => {
  //   console.log("useEffect run on render");
  //   let cart = state.cart;
  //   let total = Object.keys(cart).reduce(function (previous, key) {
  //     return previous + cart[key].price * cart[key].quantity;
  //   }, 0);
  //   setCartTotal(total);
  // }, [state]);

  const { cartTotal, dispatch, state } = useCart();

  return (
    <div>
      <h2>Sample Component</h2>
      <div className="card-container">
        {productList.map((product) => {
          const { id, name, price } = product;
          return (
            <div className="card" key={id}>
              <div className="product-name">{name}</div>
              <div className="product-price">{price}</div>
              <div className="product-status">
                <button
                  onClick={() =>
                    dispatch({ type: "ADD-TO-CART", payload: { id: id } })
                  }
                >
                  +
                </button>
                <div className="cart-count">{state.cart[id].quantity}</div>
                <button
                  onClick={() =>
                    dispatch({
                      type: "SUBTRACT-FROM-CART",
                      payload: { id: id },
                    })
                  }
                >
                  -
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: "REMOVE-FROM-CART",
                      payload: { id: id },
                    })
                  }
                >
                  Remove
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE-WISHLIST",
                      payload: { id: id },
                    })
                  }
                >
                  Wishlist
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="card">
        <h1>TOTAL: {cartTotal}</h1>
      </div>
    </div>
  );
}

export default SampleComponent;
