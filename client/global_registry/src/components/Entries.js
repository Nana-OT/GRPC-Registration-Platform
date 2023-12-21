// Entries.js
import React, { useState } from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EntryDetailsPage from './EntryDetailsPage';

const Entries = ({ entries }) => {
  const [selectedEntry, setSelectedEntry] = useState(null)
  const navigate = useNavigate();

  const handleViewDetails = (entry) => {
    setSelectedEntry(entry);
    navigate(`/dashboard/entry-details/${entry._id}`);
  };

  const handleCloseDetails = () => {
    setSelectedEntry(null);
  };


  const handleDelete = async (entry) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');

    if (confirmDelete) {
      try {
        // Make a DELETE request to the server to remove the selected member
        await axios.delete('http://localhost:3001/api/remove-member', {
          data: { firstName: entry.firstName, lastName: entry.lastName },
        });

        // Update the state to remove the selected entry from the entries list
        setSelectedEntry(null); // Clear selected entry if any
        alert('Member removed successfully');
        // Reload entries after deletion
        window.location.reload();
      } catch (error) {
        console.error('Error removing member:', error.message);
      }
    }
  };

  return (
    <div className="entries-container">
      <table>
        <thead>
          <tr className='entries-th'>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Actions</th>
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
              <td className='td-btns'>
                <button className='td-btns-v' onClick={() => handleViewDetails(entry)}>View</button>
                <button className='td-btns-d' onClick={() => handleDelete(entry)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEntry && (
        <EntryDetailsPage entry={selectedEntry} />
      )}
      {selectedEntry && <button onClick={handleCloseDetails}>Close Details</button>}
    </div>
  );
};

export default Entries;
