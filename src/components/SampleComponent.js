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
        case "A":
          state = { ...state, counterA: state.counterA + 1 };
          break;
        case "B":
          state = { ...state, counterB: state.counterB + 1 };
          break;

        default:
          break;
      }
      return state;
    },
    { counterA: 0, counterB: 0 }
  );

  return (
    <div>
      <h2>Sample Component</h2>
      <h3>
        A: {state.counterA} B: {state.counterB}
      </h3>
      <button onClick={() => dispatch({ type: "A" })}>A</button>
      <button onClick={() => dispatch({ type: "B" })}>B</button>
    </div>
  );
}

export default SampleComponent;
