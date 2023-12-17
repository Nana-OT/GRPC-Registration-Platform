import React from 'react';
import Logo from '../images/Global-Icon.jpg';
import { useState, useEffect } from 'react';
import Entries from './Entries';
import Multicast from './Multicast';
import axios from 'axios';

export default function Dashboard() {
  const [unicastVisible, setUnicastVisible] = useState(false);
  const [multicastVisible, setMulticastVisible] = useState(false);
  const [broadcastVisible, setBroadcastVisible] = useState(false);
  const [entries, setEntries] = useState([]);
  const [unicastMessage, setUnicastMessage] = useState('');
  const [multicastMessage, setMulticastMessage] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [unicastRecipient, setUnicastRecipient] = useState('');

  const toggleUnicastWindow = () => {
    setUnicastVisible(!unicastVisible);
  };

  const toggleMulticastWindow = () => {
    setMulticastVisible(!multicastVisible);
  };

  const toggleBroadcastWindow = () => {
    setBroadcastVisible(!broadcastVisible);
  };

  const handleAddMember = (entry) => {
    const genderWithUppercase = entry.gender.map((gender) => gender.charAt(0).toUpperCase() + gender.slice(1));
    const updatedEntry = { ...entry, gender: genderWithUppercase };
    setEntries([...entries, updatedEntry]);
  };

  const handleRemove = async (selectedEntry) => {
    try {
      // Make a DELETE request to the server to remove the selected member
      await axios.delete('http://localhost:3001/api/remove-member', {
        data: { firstName: selectedEntry.firstName, lastName: selectedEntry.lastName },
      });
  
      // Update the state to remove the selected entry from the entries list
      setEntries(entries.filter(entry => entry !== selectedEntry));
  
      console.log('Member removed successfully');
    } catch (error) {
      console.error('Error removing member:', error.message);
    }
  };

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
          <button onClick={toggleUnicastWindow} className="navbar-option">Unicast</button>
          <button onClick={toggleMulticastWindow} className="navbar-option">Multicast</button>
          <button onClick={toggleBroadcastWindow} className="navbar-option">Broadcast</button>
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

      {/* Unicast Window */}
      {unicastVisible && (
        <div className="unicast-window">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              // Add logic to send unicast message
              console.log(`Unicast message to ${unicastRecipient}: ${unicastMessage}`);
              setUnicastRecipient('');
              setUnicastMessage('');
              setUnicastVisible(false);
            }}
          >
            <div className='form-col'>
              <div className='form-row'>
                <label htmlFor="unicastRecipient">Recipient's Name:</label>
                <input type="text" id="unicastRecipient" value={unicastRecipient} onChange={(e) => setUnicastRecipient(e.target.value)} required />
              </div>

              <div className='form-row message-box'>
                <label htmlFor="unicastMessage">Message:</label>
                <textarea id="unicastMessage" value={unicastMessage} onChange={(e) => setUnicastMessage(e.target.value)} required />
              </div>
            </div>
            <button type="submit">Send Unicast</button>
          </form>
        </div>
      )}

      {/* Multicast Window */}
      {multicastVisible && (
        <Multicast entries={entries} onRemove={handleRemove} />
      )}

      {/* Broadcast Window */}
      {broadcastVisible && (
        <div className="broadcast-window">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              // Add logic to send broadcast message
              console.log(`Broadcast message: ${broadcastMessage}`);
              setBroadcastMessage('');
              setBroadcastVisible(false);
            }}
          >
            <label htmlFor="broadcastMessage">Message:</label>
            <textarea id="broadcastMessage" value={broadcastMessage} onChange={(e) => setBroadcastMessage(e.target.value)} required />

            <button type="submit">Send Broadcast</button>
          </form>
        </div>
      )}
    </div>
  );
}
