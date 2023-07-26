import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Rating from '../Rating/Rating.jsx'
import './Product.css';
import { AddToCartHandler } from '../../services/addToCart.js';
import { store } from '../../Context/store.jsx';
import { useContext } from 'react';


const Product = ({ product }) => {
  const {state , dispatch : ctxDispatch} = useContext(store);
  const {cart: {cartItems}} = state;

  return (
    <>
      <Card className='product-card'>
        <Link to={`/product/${product.token}`}>
          <Card.Img variant="top" src={product.image} alt={product.title} className='card-image-page' />
            </Link>
          <Card.Body className='card-body'>
          <Link to={`/product/${product.token}`}>
            <Card.Title className='text-shortener'>{product.title}</Card.Title>
            </Link>
            <Rating rating={product.rating.rate} numReviews={product.rating.count}></Rating>
            <Card.Text>{product.price}$</Card.Text>
            {product.countInStock === 0 ?
              (<Button variant='light' disabled>Out Of Stock</Button>) :
              (<Button className='btn-primary' onClick={() => { AddToCartHandler(product , cartItems , ctxDispatch)}}>Add To Cart</Button>)}
          </Card.Body>
      </Card>
    </>
  )
}

export default Product