import { useEffect, useState } from "react";
import axios from "./utils/axios";
function App() {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    axios.get("products").then((res: any) => setproducts(res.data.products));
  }, []);
  return (
    <div>
      {products.map((item: { id: number; title: string }) => (
        <div key={item.id}>{`${item.id}: ${item.title}`}</div>
      ))}
    </div>
  );
}

export default App;
