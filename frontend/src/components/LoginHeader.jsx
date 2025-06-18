import React from 'react'
import logo from '../images/kou.png';

function LoginHeader() {
    return (
        <div className='login_header'>
            <img className='logo' src={logo} alt="kou-logo" width={100} height={100} />
            <h2>ÖĞRENCİ BİLGİ SİSTEMİ GİRİŞ</h2>
        </div>
    )
}

export default LoginHeader
