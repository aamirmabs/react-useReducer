import "./App.css";
import SampleComponent from "./components/SampleComponent";
import { useCart } from "./contexts/CartContext";
import productList from "./data/productList";

function App() {
  const { cartState, setCartState, state } = useCart();

  return (
    <div className="App">
      <h1>Clean React</h1>
      {state.wishlist.map((item) => {
        return <div key={item}>{item}</div>;
      })}
      <SampleComponent />
    </div>
  );
}

export default App;
