import { useState } from "react";
import Unit from "./UnitConverter";
import "./App.css";
import UnitConverter from "./UnitConverter";

function App() {
  const [count, setCount] = useState(0);

  return <>{UnitConverter()}</>;
}

export default App;
