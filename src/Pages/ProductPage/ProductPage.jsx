import React, { useContext, useEffect, useReducer } from 'react'
import MessageBox from '../../Components/MessageBox/MessageBox';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';
import {useParams } from 'react-router-dom';
import { AddToCartHandler } from '../../services/addToCart';
import CartDescription from '../../Components/CartDescription/CartDescription';
import ProductDescription from '../../Components/ProductDescription/ProductDescription';
import { store } from '../../Context/store'
import { toast } from 'react-toastify'
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../../Reducers/Actions';
import {Row , Col} from'react-bootstrap';
import './ProductPage.css';


const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return { ...state, loading: true };
    case GET_SUCCESS:
      return { ...state, loading: false, product: payload };
    case GET_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
const ProductPage =  () => {
  const params = useParams();
  const token = params.token;

  const {state, dispatch: ctxDispatch} = useContext(store);
  const {cart: {cartItems}}= state;

  const initState = {
    loading: true,
    error: '',
    product: {}
  };

  const [{ loading, error, product }, dispatch] = useReducer(
    reducer,
    initState
  );

  const errSettings = {
    theme: "colored",
    hideProgressBar: true,
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  }

  const addToCart = async () => {
    await AddToCartHandler(product, cartItems, ctxDispatch);
  };

  useEffect(() => {

    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const res = await axios.get(`/products/token/${token}`);
        dispatch({ 
          type: GET_SUCCESS,
          payload: res.data});
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: error.message });
        toast.error(error.message, errSettings);
      }
    };
    getProduct();
  },[token]);



  return (
    <div>
    {loading ? (
      <Loading />
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div>
        <Row>
          <Col md={4}>
            <img 
              src={`${product.image}`}
              alt={product.title}
              className="card-img-top card-image product-page-img"
            />
          </Col>

          <Col md={5}>
            <ProductDescription {...product} className="product-page-desc" />
          </Col>

          <Col md={3}>
            <CartDescription product={product} addToCart={addToCart} />
          </Col>
        </Row>
      </div>
    )}
  </div>
  );
}

export default ProductPage