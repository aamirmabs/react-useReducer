import React, { useState, createContext, useContext } from "react";

const SampleContext = createContext(null);
export { SampleContext };

export function SampleProvider({ children }) {
  const [stateValue, setStateValue] = useState(0);

  return (
    <SampleContext.Provider value={{ stateValue, setStateValue }}>
      {children}
    </SampleContext.Provider>
  );
}

export function useSample() {
  return useContext(SampleContext);
}
