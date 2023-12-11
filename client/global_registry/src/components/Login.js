import React from 'react'
import { useState } from 'react';
import '../App.css';
import Logo from '../images/Global-Icon.jpg'

export default function Login() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [hasPasswordToggleSupport, setHasPasswordToggleSupport] = useState(false);

    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };    
  return (
    <diV>
        <img src={Logo} alt='GRPC-Logo' className='logo'/>
        <div className='sign-in-section'>
            <div>
                <span className="heading">Sign in</span><br/>
                <span className='slogan'>Rescue the perishing, Care for the dying</span>
            </div>
            <form>
                <input type='text' placeholder='Username' className='user-input-field'/>
                <div>
                    <input type={showPassword? 'text' : 'password'} id='passwordField' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='pass-input-field'/>
                    <span id='customToggle' className='passShow' onClick={togglePasswordVisibility}>{showPassword ? 'Hide' : 'Show'}</span>
                </div>
                <a href='#' className='forgot'><span>Forgot password?</span></a>
                <button className='sign-button'>Sign in</button>
            </form>
            <footer className='footer'>
                <span>&copy; 2023 Global Rescue Power Chapel</span>
            </footer>
        </div>
      </diV>
  )
}