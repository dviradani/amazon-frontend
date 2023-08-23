import { useEffect, useReducer, useState } from "react";
import Products from "../../Components/Products/Products";
import axios from "axios";
import './HomePage.css';
import { HomePageReducer, initialState } from '../../Reducers/HomePageReducer';
import Loading from '../../Components/Loading/Loading';
import MessageBox from '../../Components/MessageBox/MessageBox';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../../Reducers/Actions";


const HomePage = () => {

  const [{ loading, error, products }, dispatch] = useReducer(HomePageReducer, initialState);
  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        dispatch({ type: GET_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: GET_FAIL, payload: error.message });
      });
    }
  , [])
  return (
    <div className="products">
      {loading ? (<Loading></Loading>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (<Products products={products}></Products>)}
    </div>
  );
};

export default HomePage;