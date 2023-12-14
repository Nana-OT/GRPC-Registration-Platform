import React from 'react';
import Logo from '../images/Global-Icon.jpg';
import { useState } from 'react';

export default function Dashboard() {
  const [addMemberVisible, setAddMemberVisible] = useState(false);

  const toggleAddMemberWindow = () => {
    setAddMemberVisible(!addMemberVisible);
  };
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <img src={Logo} alt="GRPC-Logo" className="nav-logo"/>
          <span className='churchName'>Global Rescue Power Chapel (Accra Branch)</span>
        </div>
        <div className="navbar-options">
          <button onClick={toggleAddMemberWindow} className="navbar-option">ADD</button>
          <button className="navbar-option">REMOVE</button>
          <button to="/update" className="navbar-option">UPDATE</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <h2 className='dash-welcome'>Welcome to the Dashboard</h2>
        <h3 className='No-Entries'>There are <span>No Entries</span> currently</h3>
      </div>
            {/* Add Member Window */}
            {addMemberVisible && (
        <div className="add-member-window">
          <form>
            {/* Form fields go here */}
            <div className='form-row'>
              <label htmlFor="F-name">First Name:</label>
              <input type="text" id="F-name" name="F-name" />
              <label htmlFor="L-name">Last Name:</label>
              <input type="text" id="L-name" name="L-name" />
            </div>
            <div className='form-row'>
              <label htmlFor="P-num">Phone No:</label>
              <input type="text" id="P-num" name="P-name" />
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" />
            </div>
            <div className='gender'>
              <label>Gender:</label>
                <div>
                  <input type="checkbox" id="male" name="gender" value="male" />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input type="checkbox" id="female" name="gender" value="female" />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            {/* Reset and Add buttons */}
            <div className='btns'>
              <button className='reset-btn' type="reset">Reset</button>
              <button type="submit">Add</button>
              <button className='close-btn' onClick={toggleAddMemberWindow}>Close</button>
            </div>
          </form>
        </div>
      )}
      <footer className='footer'>
        <span>&copy; 2023 Global Rescue Power Chapel</span>
      </footer>
    </div>
  );
}
