import React from 'react'
import { useState } from 'react';
import '../App.css';
import Logo from '../images/Global-Icon.jpg'
import axios from 'axios';

export default function Login() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:5000/login', {
            username,
            password,
          });
    
          const { token } = response.data;
    
          // Save the token (e.g., in local storage or state)
          console.log('Login successful! Token:', token);
        } catch (error) {
          console.error('Login failed:', error.response.data.message);
        }
      };
    
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
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='user-input-field'/>
                <div>
                    <input type={showPassword? 'text' : 'password'} id='passwordField' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='pass-input-field'/>
                    <span id='customToggle' className='passShow' onClick={togglePasswordVisibility}>{showPassword ? 'Hide' : 'Show'}</span>
                </div>
                <a href='#' className='forgot'><span>Forgot password?</span></a>
                <button className='sign-button' onClick={handleLogin}>Sign in</button>
            </form>
            <footer className='footer'>
                <span>&copy; 2023 Global Rescue Power Chapel</span>
            </footer>
        </div>
      </diV>
  )
}