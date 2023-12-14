import React from 'react';
import Logo from '../images/Global-Icon.jpg';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <img src={Logo} alt="GRPC-Logo" className="nav-logo"/>
          <span className='churchName'>Global Rescue Power Chapel (Accra Branch)</span>
        </div>
        <div className="navbar-options">
          <Link to="/add-member" className="navbar-option">ADD</Link>
          <Link to="/remove-member" className="navbar-option">REMOVE</Link>
          <Link to="/update" className="navbar-option">UPDATE</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <h2 className='dash-welcome'>Welcome to the Dashboard</h2>
        <h3 className='No-Entries'>There are <span>No Entries</span> currently</h3>
      </div>
    </div>
  );
}
