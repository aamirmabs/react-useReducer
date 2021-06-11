import React, { useEffect, useReducer } from "react";

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

  const [cartTracker, dispatch] = useReducer(
    (prevCartTracker, value) => {
      // check if item is already in cartTracker
      const { type, id } = value;
      let newCartTracker = { ...prevCartTracker };
      const { cart, wishlist } = newCartTracker;
      const product = getProductFromID(id);

      switch (type) {
        case "CART-ADD":
          let newCart = [...cart];

          // check if item is already in cart
          let indexInCart = cart.findIndex((cartItem) => cartItem.id === id);
          newCart[indexInCart].productPosition = productList.findIndex(
            (product) => product.id === id
          );

          let indexInProductList = productList.findIndex(
            (product) => product.id === id
          );

          newCart[indexInCart].units = newCart[indexInCart].units + 1;
          newCart[indexInCart].cost =
            productList[indexInProductList].price * newCart[indexInCart].units;

          break;

        default:
          console.log(`No Case`);
          break;
      }

      console.log("prevCartTracker", prevCartTracker);
      console.log("newCartTracker", newCartTracker);
      return newCartTracker;
    },
    {
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
      ],
      wishlist: [],
    }
  );

  return (
    <div>
      <h2>Sample Component</h2>
      <div className="layout">
        <div className="products-list bordered">
          <h3>Products</h3>
          {productList.map((product) => {
            return (
              <div className="product-item" key={product.id}>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>
                  <button
                    onClick={() =>
                      dispatch({ type: "CART-ADD", id: product.id })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart">
          <h3>Cart</h3>
          {cartTracker.cart.map((item) => {
            let position = item.productPosition;
            return (
              <div key={item.id}>
                {productList[position].name} X {item.units} = {item.cost}
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
