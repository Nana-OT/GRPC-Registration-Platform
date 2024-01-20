import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export default function EntryDetailsPage() {
    const { _id } = useParams();
    const [record, setRecord] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editableEntry, setEditableEntry] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log("The ID is", _id);
            const response = await axios.get(`http://localhost:3001/api/get-entry/${_id}`);
            if (response.data && response.data.entry) {
              setRecord(response.data.entry)
              setEditableEntry(response.data.entry);
            }
          } catch (error) {
            console.error('Error fetching entry:', error);
            // Handle error, e.g., display an error message
          }
        };
        fetchData();
      }, [_id]);

      const handleChange = (event) => {
        // setRecord({ ...record, [event.target.name]: event.target.value });
        setEditableEntry({
          ...editableEntry,
          [event.target.name]: event.target.value,
        });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.put(`http://localhost:3001/api/update-member/${_id}`, editableEntry);
          console.log('Member updated:', response.data);
          setIsEditing(false);
          alert("Details Update Succesfully");
          navigate('/dashboard');

          // Handle success, e.g., display a success message or redirect
        } catch (error) {
          console.error('Error updating member:', error);
          // Handle error, e.g., display an error message
        }
      };

      if (!record) {
        return <p>Loading entry...</p>; // Or display a loading indicator
      }

      const handleEdit = () => {
        setIsEditing(true);
      };

      const handleCancel = () => {
        setIsEditing(false);
        // Reset the editableEntry to the original entry when canceled
        setEditableEntry(record);
      };

  return (
    <div>
        <h5 className='text-center mt-5'>Update Entry</h5>
      <Table className='mt-4 table-dark table-hover table-bordered'>
        <thead className="form-group">
            <tr className='table-info'>
                <th> First Name</th>
                <th> Last Name</th>
                <th> Phone Number</th>
                <th> Address</th>
                <th> Gender</th>
            </tr>                 
        </thead>
        <tbody className='table-group-divider'>
          {Object.keys(record).length > 0 ? (
            <>
              <tr>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={editableEntry.firstName}
                      onChange={handleChange}
                    />
                  ) : (
                    record.firstName
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={editableEntry.lastName}
                      onChange={handleChange}
                    />
                  ) : (
                    record.lastName
                  )}
                </td>              
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phoneNumber"
                      value={editableEntry.phoneNumber}
                      onChange={handleChange}
                    />
                  ) : (
                    record.phoneNumber
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editableEntry.address}
                      onChange={handleChange}
                    />
                  ) : (
                    record.address
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="gender"
                      value={editableEntry.gender}
                      onChange={handleChange}
                    />
                  ) : (
                    record.gender
                  )}
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan="2">Loading...</td>
            </tr>
          )}
        </tbody>
    </Table>
    {isEditing ? (
        <div className='position-absolute start-50 translate-middle top-50'>
          <Button onClick={handleSubmit} variant='success'>Save</Button>
          <Button onClick={handleCancel} variant='danger' className='cancel'>Cancel</Button>
        </div>
      ) : (
        <Button onClick={handleEdit}>Edit</Button>
      )}
    </div>
  )
}
