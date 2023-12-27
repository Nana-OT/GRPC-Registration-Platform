import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Entries({records, onAddEntry}) {
  const [newEntry, setNewEntry] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    address: '',
  });
  
  const navigate = useNavigate();

  if (!Array.isArray(records)) {
    console.error('Invalid data structure for records:', records);
    return null; 
  }  
  const handleEditClick = (id) => {
    navigate(`/dashboard/get-entry/${id}`); 
  };

  return (
    <div>
      <Table className='mt-2 table-dark table-hover table-bordered'>
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
                <Button variant="secondary" onClick={() => handleEditClick(record.id)}>Edit</Button>
                <Button variant="warning">Delete</Button>
              </td>
            </tr>
          ))
        }
        <tr>
            <td>{records.length + 1}</td>
            <td>
              <input
                type="text"
                value={newEntry.firstName}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, firstName: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={newEntry.lastName}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, lastName: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={newEntry.phoneNumber}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, phoneNumber: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={newEntry.gender}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, gender: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={newEntry.address}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, address: e.target.value })
                }
              />
            </td>
            <td>
              <Button variant="success" onClick={() => onAddEntry(newEntry)}>
                Save
              </Button>
            </td>
          </tr>
      </tbody>
      </Table>
    </div>
  )
}
