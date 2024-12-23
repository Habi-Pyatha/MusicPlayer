import React from 'react'
import { loginEndpoint } from '../../spotify'
import "./login.css"
function Login() {
    return (
        <div className='login-page'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1200px-Spotify_logo_with_text.svg.png' className='logo'/>
            <a href={loginEndpoint}>
                <div className='login-btn'>Log In</div>
            </a>
        </div>
    )
}

export default Login
