import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/Global-Icon.jpg'
import axios from 'axios';

Modal.setAppElement('#root'); // Set the root element for accessibility

export default function Login() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const navigate = useNavigate();

    const openModal = (content) => {
      setModalContent(content);
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
    
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
          console.log("Login Successful");
          openModal('Login Successful');
          // Redirect or perform other actions as needed
          navigate('/dashboard')
        } else {
          // Invalid credentials
          console.log("Invalid Credentials");
          openModal('Invalid Credential.');
        }
      } catch (error) {
        console.error(error);
        // Handle other errors
        openModal('An error occurred. Please try again later.');
      }
    };

  return (
    <div>
        <img src={Logo} alt='GRPC-Logo' className='logo'/>
        <section className='login-section'>
            <form onSubmit={handleLogin}>
            <div className='section-title'>
                <span className="fw-bold fs-4">Sign in</span><br/>
                <span className='slogan'>Rescue the Perishing, Care for the Dying</span>
            </div>
            <div className='mt-5'>
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='user-input-field'/>
                <div>
                    <input type={showPassword? 'text' : 'password'} id='passwordField' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='pass-input-field'/>
                    <span id='customToggle' className='passShow' onClick={togglePasswordVisibility}>{showPassword ? 'hide' : 'show'}</span>
                </div>
                <span className='forgot m-2'>Forgot password?</span><br/>
                <button type='submit' className='sign-in-btn'>Sign in</button><br/>
                <span className='no-account mt-3 slogan'>Don't have an account? Contact Administrator</span><br/>
              </div>
            </form>
        </section>
        <footer className='fixed-bottom text-center'>
          <span>&copy; 2023 Global Rescue Power Chapel</span>
          </footer>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Modal'
        className='modal'>
          <p>{modalContent}</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
    </div>
  )
}