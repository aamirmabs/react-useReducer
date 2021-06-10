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
  useEffect(() => {
    console.log("useEffect run on render");
    return () => {
      console.log("useEffect cleanup");
    };
  }, []);

  // const [state, setStateFunc] = useState(0);
  // const [state, setStateFunc] = useReducer((accumulator, value) => {}, {});
  // const [state, dispatch] = useReducer((state, value) => {}, {});

  const [cartTracker, dispatch] = useReducer(
    (prevCartTracker, value) => {
      // console.log(value);

      const { type, id } = value;
      const { cart, wishlist } = prevCartTracker;
      const productIndex = productList.findIndex(
        (product) => product.id === id
      );
      const product = productList[productIndex];

      console.log({ product });

      switch (type) {
        case "CART-ADD":
          let newUnits = -1;
          let prevUnits = -1;

          // check if
          if (cart[id] === undefined) {
            newUnits = 1;
          } else {
            prevUnits = cart[id].units;
          }

          if (prevUnits >= 1) newUnits = prevUnits + 1;
          else newUnits = 1;

          prevCartTracker = {
            ...prevCartTracker,
            cart: { [id]: { units: newUnits, cost: newUnits * product.price } },
          };
          break;

        default:
          break;
      }

      console.log(prevCartTracker);
      return prevCartTracker;
    },
    { cart: {}, wishlist: {} }
  );

  return (
    <div>
      <h2>Sample Component</h2>
      <div className="layout">
        <div className="products-list bordered">
          <h3>Products</h3>
          {productList.map((product) => {
            return (
              <div className="product-item">
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>
                  <button
                    onClick={() => {
                      dispatch({ type: "CART-ADD", id: product.id });
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="wishlist">
          <h3>Wishlist</h3>
        </div>
        <div className="cart">
          <h3>Cart</h3>
        </div>
      </div>
    </div>
  );
}

export default SampleComponent;
