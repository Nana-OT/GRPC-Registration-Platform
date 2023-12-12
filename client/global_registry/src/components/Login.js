import React from 'react'
import { useState } from 'react';
import '../App.css';
import Logo from '../images/Global-Icon.jpg'
import axios from 'axios';

export default function Login() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:3001/api/login', {
          username: username,
          password: password,
        });
  
        if (response.data.success) {
          // Successful login
          alert('Successful Login');
          // Redirect or perform other actions as needed
        } else {
          // Invalid credentials
          alert('Invalid Credentials');
        }
      } catch (error) {
        console.error(error);
        // Handle other errors
      }
    };

  return (
    <div>
        <img src={Logo} alt='GRPC-Logo' className='logo'/>
        <div className='sign-in-section'>
            <div>
                <span className="heading">Sign in</span><br/>
                <span className='slogan'>Rescue the Perishing, Care for the Dying</span>
            </div>
            <form onSubmit={handleLogin}>
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='user-input-field'/>
                <div>
                    <input type={showPassword? 'text' : 'password'} id='passwordField' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='pass-input-field'/>
                    <span id='customToggle' className='passShow' onClick={togglePasswordVisibility}>{showPassword ? 'Hide' : 'Show'}</span>
                </div>
                <a href='#' className='forgot'><span>Forgot password?</span></a>
                <button type='submit' className='sign-button'>Sign in</button>
                <span className='no-account'>Don't have an account? Contact Administrator</span>
            </form>
            <footer className='footer'>
                <span>&copy; 2023 Global Rescue Power Chapel</span>
            </footer>
        </div>
      </div>
  )
}