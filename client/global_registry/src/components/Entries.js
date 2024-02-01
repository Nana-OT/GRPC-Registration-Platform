import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

export default function Entries({records, onAddEntry, onDeleteEntry}) {
  const [newEntry, setNewEntry] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    address: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);
  
  const navigate = useNavigate();

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleSaveClick = () => {
    onAddEntry(newEntry);
    // Display an alert
    alert('Member added successfully');
    window.location.reload();
    // Navigate away from the current page
    navigate('/dashboard');
  };

  const handleCancelClick = () => {
    setShowAddForm(false);
    // Reset the form fields
    setNewEntry({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: '',
      address: '',
    });
  };

  const handleDeleteClick = (id) => {
    // Call the onDeleteEntry prop to handle the deletion
    onDeleteEntry(id);
  };

  if (!Array.isArray(records)) {
    console.error('Invalid data structure for records:', records);
    return null; 
  } 

  return (
    <div>
    {!showAddForm && (
        <Button variant="secondary" className='start-50 translate-middle position-relative mt-5' onClick={handleAddClick}>
          Add Member
        </Button>
      )}
      <Table className='table-dark table-hover table-bordered'>
      <thead>
        <tr className='table-info'>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className='table-group-divider'>
        {
          records.map((record, index) =>(
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{record.firstName}</td>
              <td>{record.lastName}</td>
              <td>{record.phoneNumber}</td>
              <td>{record.gender.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(', ')}</td>
              <td>{record.address}</td>
              <td className='actions'>
                <Button variant="secondary" onClick={() =>  navigate(`/dashboard/get-entry/${record._id}`)}>Update</Button>
                <Button variant="warning" className='del' onClick={() => handleDeleteClick(record._id)}>Delete</Button>
              </td>
            </tr>
          ))
        }
        {showAddForm && (
        <tr className='new-entry'>
            <td>{records.length + 1}</td>
            <td>
              <input
                type="text"
                value={newEntry.firstName}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, firstName: e.target.value })
                }
                required
              />
            </td>
            <td>
              <input
                type="text"
                value={newEntry.lastName}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, lastName: e.target.value })
                }
                required
              />
            </td>
            <td>
              <input
                type="text"
                value={newEntry.phoneNumber}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, phoneNumber: e.target.value })
                }
                required
              />
            </td>
            <td>
              <input
                type="text"
                value={newEntry.gender}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, gender: e.target.value })
                }
                required
              />
            </td>
            <td>
              <input
                type="text"
                value={newEntry.address}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, address: e.target.value })
                }
                required
              />
            </td>
            <td>
              <Button variant="success" onClick={handleSaveClick}>
                Save
              </Button>
              <Button variant="secondary" className='cancel' onClick={handleCancelClick}>
                Cancel
              </Button>
            </td>
          </tr>
          )}
      </tbody>
      </Table>
    </div>
  )
}
