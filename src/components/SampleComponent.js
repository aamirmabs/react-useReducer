import React, { useEffect, useReducer } from "react";
import wishlistTrue from "../images/icons/wishlist-true.png";
import wishlistFalse from "../images/icons/wishlist-false.png";

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

function SampleComponent() {
  // useEffect(() => {
  //   console.log("useEffect run on render");
  //   return () => {
  //     console.log("useEffect cleanup");
  //   };
  // }, []);

  // const [state, setStateFunc] = useState(0);
  // const [state, setStateFunc] = useReducer((accumulator, value) => {}, {});
  // const [state, dispatch] = useReducer((state, value) => {}, {});

  const getProductFromID = (id) => {
    const productIndex = productList.findIndex((product) => product.id === id);
    const product = productList[productIndex];

    return product;
  };

  const initialCart = {
    cart: [
      {
        id: "prod1",
        productPosition: 0,
        units: 0,
        cost: 0,
      },
      {
        id: "prod2",
        productPosition: 1,
        units: 0,
        cost: 0,
      },
      {
        id: "prod3",
        productPosition: 2,
        units: 0,
        cost: 0,
      },
      {
        id: "prod4",
        productPosition: 3,
        units: 0,
        cost: 0,
      },
      {
        id: "prod5",
        productPosition: 4,
        units: 0,
        cost: 0,
      },
    ],
    wishlist: ["prod1", "prod2"],
  };

  const [cartTracker, dispatch] = useReducer((prevCart, value) => {
    let newCart = { ...prevCart };
    // console.log("newCart before: ", newCart.cart);

    // check if product exists in the cart
    const cartIndex = prevCart.cart.findIndex((item) => item.id === value.id);

    switch (value.type) {
      case "CART-INCREASE":
        // console.log("CART-INCREASE" + Math.random().toFixed(2));

        // console.log(cartIndex);

        // increase units of item if exists
        let newUnits = prevCart.cart[cartIndex].units + 1;
        newCart.cart[cartIndex].units = newUnits;

        // console.log("newCart after: ", newCart.cart);
        return newCart;

      case "CART-REMOVE":
        newCart.cart.splice(cartIndex, 1);
        // console.log("After remove: ", newCart);
        return newCart;

      case "WISHLIST-TOGGLE":
        const wishlistIndex = newCart.wishlist.findIndex(
          (item) => item === value.id
        );

        if (wishlistIndex >= 0) {
          console.log("Wishlist exists");
          newCart.wishlist.splice(wishlistIndex, 1);
        } else {
          console.log("Wishlist NOT exists");
          newCart.wishlist.push(value.id);
        }
        console.log(newCart.wishlist);
        return newCart;
      default:
        console.log("default");
        return newCart;
    }
  }, initialCart);

  return (
    <div>
      <h2>Sample Component</h2>
      <div className="layout">
        <div className="products-list bordered">
          <h3>Products</h3>
          {productList.map((product) => {
            const wishlistIcon = cartTracker.wishlist.includes(product.id)
              ? "images/icons/wishlist-true.png"
              : "images/icons/wishlist-false.png";
            return (
              <div className="product-item" key={product.id}>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>
                  <button
                    onClick={() =>
                      dispatch({ type: "CART-INCREASE", id: product.id })
                    }
                  >
                    +
                  </button>
                </div>
                <div>
                  <img
                    onClick={() =>
                      dispatch({ type: "WISHLIST-TOGGLE", id: product.id })
                    }
                    className="wishlist-icon"
                    src={wishlistIcon}
                    alt="wishlist"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart">
          <h3>Cart</h3>
          {cartTracker.cart.map((product) => {
            let position = product.productPosition;

            return (
              <div key={product.id}>
                {productList[position].name} X {product.units} = {product.cost}{" "}
                <button
                  onClick={() => {
                    dispatch({ type: "CART-REMOVE", id: product.id });
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <h3>
            TOTAL:{" "}
            {cartTracker.cart.reduce((acc, val) => {
              return acc + val.cost;
            }, 0)}
          </h3>
        </div>
        <div className="wishlist">
          <h3>Wishlist</h3>
        </div>
      </div>
    </div>
  );
}

export default SampleComponent;
