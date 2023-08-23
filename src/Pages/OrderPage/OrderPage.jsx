import React from 'react'
import Loading from '../../Components/Loading/Loading'
import MessageBox from '../../Components/MessageBox/MessageBox'
import Title from '../../Components/Title/Title'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../../Reducers/Actions'
import { useContext, useEffect } from 'react'
import { store } from '../../Context/store'
import { useReducer } from 'react'
import axios from 'axios'

const OrderPage = () => {
    const reducer = (state, { type, payload }) => {
        switch (type) {
            case GET_REQUEST:
                return { ...state, loading: true, error: '' };
            case GET_SUCCESS:
                return { ...state, loading: false, order: payload, error: '' };
            case GET_FAIL:
                return { ...state, loading: false, error: payload };

            default:
                return state;
        }
    };

    const { state: { userInfo } } = useContext(store);
    const navigate = useNavigate();
    const params = useParams();
    const { id: orderId } = params;

    const initialState = {
        loading: true,
        order: null,
        error: ''
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {

        if (!userInfo) {
            navigate('/signin')
        }
        const getOrder = async () => {
            dispatch({ type: GET_REQUEST });

            try {
                const result = await axios.get(`/orders/${orderId}`, {
                    headers: {
                        authorization:  userInfo.token
                    }
                });
                dispatch({ type: GET_SUCCESS, payload: result.data });
            }
            catch (error) {
                dispatch({ type: GET_FAIL, payload: error.message });
            }

        }
        if (!state.order || (state.order._id && orderId !== state.order._id)) {
            getOrder();
        }

    }, [navigate, state.order, orderId, userInfo])


    return state.loading ? (
        <Loading />
    ) : state.error ? (
        <MessageBox variant="danger">{state.error}</MessageBox>
    ) : (
        <div>
            <Title title="Order" />
            <h1 className="my-3">Order {state.order._id.substr(state.order._id.length - 5)}</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name: </strong> {state.order.shippingAddress.fullName} <br />
                                <strong>Address: </strong> {state.order.shippingAddress.address},
                                {state.order.shippingAddress.city} ,{state.order.shippingAddress.country}
                            </Card.Text>
                            {state.order.isDelivered ? (
                                <MessageBox variant="success">
                                    Delivered at {state.order.deliveredAt}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not Delivered</MessageBox>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method: </strong> {state.order.paymentMethod}
                            </Card.Text>
                            {state.order.isPaid ? (
                                <MessageBox variant="success">
                                    Paid at {state.order.paidAt}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not Paid</MessageBox>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant="flush">
                                {state.order.orderItems.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img
                                                    height="100"
                                                    src={item.image}
                                                    alt={item.title}
                                                    // className="img-fluid rounded img-thumbnail"
                                                ></img>{' '}
                                                <Link className='text-shortener' to={`/product/${item.token}`}>{item.title}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <span>{item.quantity}</span>
                                            </Col>
                                            <Col md={3}>${item.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${state.order.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${state.order.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${state.order.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong> Order Total</strong>
                                        </Col>
                                        <Col>
                                            <strong>${state.order.totalPrice.toFixed(2)}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderPage