import {Button, Container} from '../assets/styles'
import React,{useCallback, useState} from 'react';
import {clearErrors, requestToken} from '../store/actions/authActions'
import {useDispatch, useSelector} from 'react-redux'

import InputField from '../components/shared/InputField.component'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

function SignIn() {
    const dispatch = useDispatch();
    const {error} = useSelector((state) => state.authReducer);

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = useCallback((e) => {
        const target = e.target;

        setFormValue({
            ...formValue,
            [target.name]: target.value
        })
    },[formValue])
    
    const onSubmit = useCallback((e) => {
        e.preventDefault();

        dispatch(requestToken(formValue));
    },[formValue, dispatch]);
    
    return (
        <Container>
            <Title>Login</Title>
            <Form onSubmit={onSubmit}>
                <InputField 
                    name='email'
                    label="Email"
                    type='email'
                    value={formValue.email}
                    onChange={handleChange}
                    errors={{}}
                ></InputField>
                <InputField 
                    name='password'
                    label="Password"
                    type='password'
                    value={formValue.password}
                    onChange={handleChange}
                    errors={{}}
                ></InputField>
                {error && <FormError>{error}</FormError>}
                <SubmitBtn>
                    Log in
                </SubmitBtn>
            </Form>
            <CustomLink to='/registration' onClick={() => dispatch(clearErrors())}>Don't have an account?</CustomLink>
        </Container>
    )
}

const Title = styled.h2`
    font-size: 2rem;
    text-transform:capitalize;
    font-weight: 400;
`

const Form = styled.form`
    margin-top: 10vh;
    width: 320px;
    height: 100%;
    padding: 10px;
    background: #fff;
    box-shadow: 0px 0px 0px 1px #cccccc;
    position:relative;
    border-radius: 8px;
`

const SubmitBtn = styled(Button)`
    margin-top: 80px;
    padding: 10px;
    width: 100%;
    background: #212121;
    color: #fff;
    border-radius: 8px;
`

const CustomLink = styled(Link)`
    text-decoration:none;
    color: #212121;
    margin-top: 20px;
`

const FormError = styled.span`
    position:absolute;
    color: #d82e2e;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    text-align:center;
    width: 100%;
`

export default SignIn
