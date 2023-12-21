import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css'

const EntryDetailsPage = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState({});
  const [editableEntry, setEditableEntry] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  

  useEffect(() => {
    const fetchEntryDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:3001/api/get-entry/${id}`);
          setEntry(response.data.entry);
          setEditableEntry(response.data.entry);
        }
      } catch (error) {
        console.error('Error fetching entry details:', error.message);
      }
    };

    fetchEntryDetails();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/update-member/${id}`, editableEntry);
      setIsEditing(false);
      // Optionally, you can re-fetch the updated entry from the server
      // to reflect the changes immediately without a page refresh.
      const response = await axios.get(`http://localhost:3001/api/get-entry/${id}`);
      setEntry(response.data.entry);
    } catch (error) {
      console.error('Error saving entry details:', error.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset the editableEntry to the original entry when canceled
    setEditableEntry(entry);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Entry Details</h2>
      <table className='entry-details-table'>
        <tbody>
          {Object.keys(entry).length > 0 ? (
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
                    entry.firstName
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
                    entry.lastName
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
                    entry.phoneNumber
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
                    entry.address
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
                    entry.gender
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
      </table>

      {isEditing ? (
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default EntryDetailsPage;