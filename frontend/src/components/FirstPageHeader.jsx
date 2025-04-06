import React from 'react'
import logo from '../images/kou.png'


function FirstPageHeader() {
    return (

        <div style={{
            width: "100%", backgroundColor: "green", height: "150px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "20px"
        }}>
            <img src={logo} alt="" width={70} height={70} />
            <h1>Kocaeli Üniversitesi Bilgi Yönetim Sistemleri</h1>
        </div>

    )
}

export default FirstPageHeader