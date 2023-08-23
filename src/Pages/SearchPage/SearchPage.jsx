import React, { useEffect, useReducer, useState } from 'react'
import { prices, ratings, searchPageReducer } from './utills';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../../Reducers/Actions';
import { getFilterUrl } from '../../services/getFilterUrl';
import Title from '../../Components/Title/Title';
import { Button, Col, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import './SearchPage.css'
import Rating from '../../Components/Rating/Rating';
import Loading from '../../Components/Loading/Loading'
import MessageBox from '../../Components/MessageBox/MessageBox';
import Product from '../../Components/Product/Product'

const SearchPage = () => {

    const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(searchPageReducer, {
        loading: true,
        error: '',
    });

    console.log(countProducts);
    const navigate = useNavigate();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const category = searchParams.get('category') || 'all';
    const query = searchParams.get('query') || 'all';
    const price = searchParams.get('price') || 'all';
    const rating = searchParams.get('rating') || 'all';
    const order = searchParams.get('order') || 'newest';
    const page = searchParams.get('page') || 1;

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios.get('/products/categories');
                setCategories(data)
            }
            catch (error) {
                toast.error(error.message)
            }
        }
        getCategories();
    }, [])

    useEffect(() => {
        const getData = async () => {
            dispatch({ type: GET_REQUEST })
            try {
                const { data } = await axios.get('/products/search?' + getFilterUrl(search, { filterPrice: '1-50' }, true))
                dispatch({ type: GET_SUCCESS, payload: data });
            }
            catch (error) {
                dispatch({ type: GET_FAIL, payload: error.message });
            }

        }
        getData();
    }, [query, category, price, rating, order, page])

    return (
        <div>
            <Title>Search</Title>

            <Row>
                <Col md={3}>
                    <h3>Category</h3>
                    <div>
                        <ul>
                            <li>
                                <Link className={'all' === category ? 'text-bold' : ''} to={getFilterUrl(search, { category: 'all' })}>
                                    Any
                                </Link>
                            </li>
                            {categories.map(c => (
                                <li key={c}>
                                    <Link className={c === category ? 'text-bold' : ''} to={getFilterUrl(search, { category: c })}>
                                        {c}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Price</h3>
                        <ul>
                            <li>
                                <Link className={'all' === price ? 'text-bold' : ''} to={getFilterUrl(search, { price: 'all' })}>
                                    Any
                                </Link>
                            </li>
                            {prices.map(p => (
                                <li key={p.name}>
                                    <Link className={p.value === price ? 'text-bold' : ''} to={getFilterUrl(search, { price: p.value })}>
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Rating</h3>
                        <ul>
                            {ratings.map(r => (
                                <li key={r.name}>
                                    <Link to={getFilterUrl(search, { rating: r.value })}>
                                        <Rating rating={r.value} caption=' ' />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>
                <Col md={9}>
                    {loading ? (<Loading />) : error ? (<MessageBox variant='danger' >{error.message}</MessageBox>) : (
                        <>
                            <Row className='justify-content-between md-3'>
                                <Col md={6}>
                                    <div>
                                        {countProducts === 0 ? 'No' :
                                            countProducts} Results
                                        {query !== 'all' && ' : ' + query}
                                        {category !== 'all' && ' - Category : ' + category}
                                        {price !== 'all' && ' - Price : ' + price}
                                        {rating !== 'all' && ' - Rating : ' + rating + ' & Up.'}
                                        {query !== 'all' || category !== 'all' || price !== 'all' || rating !== 'all' ?
                                            (<Button variant='light' onClick={() => navigate('/search')}><i className='fas fa-times-circle'>
                                            </i></Button>) : null}
                                    </div>
                                </Col>
                                <Col className='text-end'>
                                    Sort by <select value={order} onChange={ (e) => navigate(getFilterUrl(search , {
                                        order: e.target.value
                                    }, ))}>
                                        <option value="newest">Newest arrivals</option>
                                        <option value="lowest">Price: low to high</option>
                                        <option value="highest">Price: high to low</option>
                                        <option value="toprated">Customer reviews</option>
                                    </select>
                                </Col>
                            </Row>
                            {products.length === 0 && (<MessageBox>No product found</MessageBox>)}
                            <Row>
                                {products.map((product) =>(
                                    <Col sm={6} lg={4} mb={3} key={product._id}>
                                    <Product product={product}/>
                                    </Col>
                                ))}
                            </Row>
                            <div>
                                {[...Array(pages).keys()].map((x) =>(
                                    <LinkContainer key={x + 1} className='mx-1' to={{pathname: '/search' , search : getFilterUrl(search , {page: x + 1 } , true)}}>
                                        <Button className={Number(page) === x + 1 ?
                                        'current-page' : ''} variant='light'>
                                            {x+1}
                                        </Button>
                                    </LinkContainer>
                                ))}
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default SearchPage