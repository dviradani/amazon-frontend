import React, { useContext } from 'react'
import MessageBox from '../../MessageBox/MessageBox';
import Loading from '../../Loading/Loading';
import { useReducer } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AddToCartHandler } from '../../services/addToCart';
import CartDescription from '../../Components/CartDescription/CartDescription';
import ProductDescription from '../../Components/ProductDescription/ProductDescription';
import {store} from '../../Context/store'
import {toast} from 'react-toastify'

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
const ProductPage = async () => {
  const initialState = {
    loading: true,
    error: '',
    products: []
  }
  const [{ loading , error , product }, dispatch] = useReducer(reducer, initialState)

  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(store);
  const { cart: cartItems } = state;
  const addToCart = async () => {
    await AddToCartHandler(product, cartItems, ctxDispatch);
  };

  useEffect(() => {
    const getProduct = async () => {
      dispatch({type: GET_REQUEST});

      try {
        const res = await axios.get(`/products/token/${token}`);
        dispatch({type: GET_SUCCESS , payload: res.data})
      }
      catch (error) {
        dispatch({type: GET_FAIL, payload: error.message})
        toast.error(error.message)
      }
    }
  
    return () => {
      second
    }
  }, [third])
  

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img
                src={`${product.image}`}
                alt={product.title}
                className="card-img-top card-image"
              />
            </Col>

            <Col md={3}>
              <ProductDescription {...product} />
            </Col>

            <Col md={3}>
              <CartDescription product={product} addToCart={AddToCart} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductPage