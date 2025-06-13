import React from 'react'
import LoginHeader from '../components/LoginHeader'
import '../css/login.css';
import LoginForm from '../components/LoginForm';
import SocialLink from '../components/SocialLink';

function Login() {
    return (
        <div className='wrapper'>
            <div className='login-box'>
                <LoginHeader />
                <LoginForm />
                <SocialLink />
            </div>

        </div>
    )
}

export default Login