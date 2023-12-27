import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export default function EntryDetailsPage() {
    const { id } = useParams();
    const [record, setRecord] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editableEntry, setEditableEntry] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`/api/get-entry/${id}`);
            if (response.data && response.data.entry) {
                setRecord(response.data);
                setEditableEntry(response.data.entry);
            }
          } catch (error) {
            console.error('Error fetching entry:', error);
            // Handle error, e.g., display an error message
          }
        };
        fetchData();
      }, [id]);

      const handleChange = (event) => {
        setRecord({ ...record, [event.target.name]: event.target.value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.put(`/api/update-member/${id}`, record);
          console.log('Member updated:', response.data);
          setIsEditing(false);
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
        <h1>Edit Entry</h1>
      <Table>
        <thead className="form-group">
            <tr>
                <td>First Name</td>
            </tr>                 
        </thead>
        <tbody>
            <tr>
                <td>
                <input type="text" id="firstName" name="firstName" value={record.firstName}             onChange={handleChange} required/> 
                </td>
            </tr>
            <tbody>
          {Object.keys(record).length > 0 ? (
            <>
              <tr>
                <th>First Name:</th>
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
              </tr>
              <tr>
                <th>Last Name:</th>
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
              </tr>
              <tr>
                <th>Phone Number:</th>
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
              </tr>
              <tr>
                <th>Address:</th>
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
              </tr>
              <tr>
                <th>Gender:</th>
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
        </tbody>
    </Table>
    {isEditing ? (
        <div>
          <Button onClick={handleSubmit}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      ) : (
        <Button onClick={handleEdit}>Edit</Button>
      )}
    </div>
  )
}
