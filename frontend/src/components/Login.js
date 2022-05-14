import Footer from './Footer';
import Form from './Form';
import Header from "./Header";
import { useState } from 'react';
import Input from './Input';

export default function Login(props) {
    const { onSubmit } = props;

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    function handleChange(event) {
        const { name, value }= event.target;
        setValues({ ...values, [name]: value, });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(!values.email || !values.password) {
            return;
        }

        onSubmit(values);
    }

    return (
        <>
            <Header navLinkPath='/signup' navLinkTitle='Sign Up' loggedInEmail='' />
            <Form 
                name='Log In Page'
                authTitleClassName='form__title_type_auth-pg'
                title='Log In' 
                authSubmitBtnClassName='form__button_type_auth-pg'
                submitBtn='Log In'
                onSubmit={handleSubmit}
            >
                <Input type='email' name='email' typeClassName='form__input_type_auth-pg' placeholder='Email' value={values.email} onChange={handleChange} />
                <Input type='password' name='password' typeClassName='form__input_type_auth-pg' placeholder='Password' value={values.password} onChange={handleChange} />
            </Form>
            <Footer
                footerClassName='footer__content'
                footerTextContent='Not a member yet? '
                navLinkPath='/signup'
                NavLinkClassName='footer__content_link'
                NavLinkText='Sign Up'
                footerTextContentEnd=' here!'
            />
        </>
    )
}
