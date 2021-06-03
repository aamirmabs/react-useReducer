import React, { useEffect } from "react";

function SampleComponent() {
  useEffect(() => {
    console.log("useEffect run on render");
    return () => {
      console.log("useEffect cleanup");
    };
  }, []);

  return (
    <div>
      <h2>Sample Component</h2>
    </div>
  );
}

export default SampleComponent;
