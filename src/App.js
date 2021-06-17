import "./App.css";
import SampleComponent from "./components/SampleComponent";
import { useCart } from "./contexts/CartContext";

function App() {
  const { cartState, setCartState } = useCart();

  return (
    <div className="App">
      <h1>Clean React</h1>
      {cartState.wishlist.map((item) => {
        return <div key={item}>{item}</div>;
      })}
      <SampleComponent />
    </div>
  );
}

export default App;
