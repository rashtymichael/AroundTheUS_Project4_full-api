import Header from "./Header";
import Footer from "./Footer";
import Form from "./Form";
import { useState } from "react";
import Input from "./Input";

export default function Register(props) {
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

        onSubmit(values);
    }

    return (
        <>
            <Header navLinkPath='/signin' navLinkTitle='Log In' loggedInEmail='' />
            <Form 
                name='Sign Up Page'
                authTitleClassName='form__title_type_auth-pg'
                title='Sign Up'
                authSubmitBtnClassName='form__button_type_auth-pg'
                submitBtn='Sign Up'
                onSubmit={handleSubmit}
            >
                <Input type='email' name='email' typeClassName='form__input_type_auth-pg' placeholder='Email' value={values.email} onChange={handleChange} />
                <Input type='password' name='password' typeClassName='form__input_type_auth-pg' placeholder='Password' value={values.password} onChange={handleChange} />
            </Form>
            <Footer 
                footerClassName='footer__content'
                footerTextContent='Already a member? '
                navLinkPath='/signin'
                NavLinkClassName='footer__content_link'
                NavLinkText='Log In'
                footerTextContentEnd=' here!'
            />
        </>
    )
}