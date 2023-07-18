import { useEffect , useState } from "react";
import Products from "../Components/Products/Products";
import axios from "axios";

export const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      axios.get("/products").then((res) => setProducts(res.data));};

    getProducts();
  },[])
  return (
    <div className="products">
      <Products products={products}></Products>
      </div>
  );
};
