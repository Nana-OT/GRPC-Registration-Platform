// Entries.js
import React from 'react';
import '../App.css'

const Entries = ({ entries }) => {
  return (
    <div className="entries-container">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.firstName}</td>
              <td>{entry.lastName}</td>
              <td>{entry.phoneNumber}</td>
              <td>{entry.address}</td>
              <td>{entry.gender.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Entries;
