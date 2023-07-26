import './CheckoutSteps.css';
import { Col, Row } from 'react-bootstrap';

import React from 'react'
import { Link } from 'react-router-dom';

const CheckoutSteps = (props) => {
    return (
        <Row className='checkout-steps'>
            <Col className={props.step1 ? 'active' : ''}>
                    Sign in
            </Col>
            <Col className={props.step2 ? 'active' : ''}>
                <Link to='/shipping'>
                    Shipping
                </Link>
            </Col>
            <Col className={props.step3 ? 'active' : ''}>
                <Link to='/payment'>
                    Payment
                </Link>
            </Col>
            <Col className={props.step4 ? 'active' : ''}>
                <Link to='/placeorder'>
                    Place order
                </Link>
            </Col>
        </Row>
    )
}

export default CheckoutSteps