import React from 'react';
import Logo from '../images/Global-Icon.jpg';
import { useState, useEffect } from 'react';
import Entries from './Entries';
import axios from 'axios';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
 

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        // Make a GET request to the server to get all entries
        const response = await axios.get('http://localhost:3001/api/get-entries');
        setEntries(response.data.entries);
      } catch (error) {
        console.error('Error fetching entries:', error.message);
      }
    };

    fetchEntries();
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <img src={Logo} alt="GRPC-Logo" className="nav-logo"/>
          <span className='churchName'>Global Rescue Power Chapel (Accra Branch)</span>
        </div>
        <div className="navbar-options">
          <button className="navbar-option">Unicast</button>
          <button className="navbar-option">Multicast</button>
          <button className="navbar-option">Broadcast</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <h2 className='dash-welcome'>Welcome to the Dashboard</h2>
        {entries.length > 0 ? (
          <Entries entries={entries} />
        ) : (
          <h3 className='No-Entries'>There are <span>No Entries</span> currently</h3>
        )}
        <div>
        </div>
      </div>
    </div>
  );
}
