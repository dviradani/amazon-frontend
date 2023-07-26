import React, { useContext , useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Title from '../../Components/Title/Title'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { store } from '../../Context/store'
import axios from 'axios'
import { USER_SIGNIN } from '../../Reducers/Actions'
import {toast} from 'react-toastify'

const SigninPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInURL = new URLSearchParams(search).get('redirect');
    const redirect = redirectInURL ? redirectInURL : "/";
    const { state, dispatch: ctxDispatch } = useContext(store);
    const { userInfo } = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/users/signin', { password, email })
            ctxDispatch({ type: USER_SIGNIN, payload: data })
            navigate(redirect || '/')
        }
        catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        userInfo && navigate(redirect);
    }, [
        navigate, redirect, userInfo
    ])

    return (
        <>
            <Container className='small-container'>
                <Title>Sign in</Title>
                <h1 className='my-3'>Sign in</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>email</Form.Label>
                        <Form.Control
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>password</Form.Label>
                        <Form.Control
                            type="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <div className='mb-3'>
                        <Button type='submit'>Sign in</Button>
                    </div>
                    <div className='mb-3'>
                        New Customer?
                        <Link to={`/signup?redirect=${redirect}`}>
                            Create New Account
                        </Link>
                    </div>
                </Form>
            </Container>
        </>
    )
}

export default SigninPage