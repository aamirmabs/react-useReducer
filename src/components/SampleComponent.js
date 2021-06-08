import React, { useEffect, useReducer } from "react";

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

  const [state, dispatch] = useReducer(
    (state, initialValue) => {
      switch (initialValue.type) {
        case "+":
          state = { ...state, counter: state.counter + 1 };
          break;
        case "-":
          state = { ...state, counter: state.counter - 1 };
          break;

        default:
          break;
      }
      return state;
    },
    { counter: 0 }
  );

  return (
    <div>
      <h2>Sample Component</h2>
      <h3>Counter: {state.counter}</h3>
      <button onClick={() => dispatch({ type: "+" })}> + </button>
      <button onClick={() => dispatch({ type: "-" })}> - </button>
    </div>
  );
}

export default SampleComponent;
