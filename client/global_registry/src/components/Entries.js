import React from 'react';
import Table from 'react-bootstrap/Table';

export default function Entries({records}) {
  if (!Array.isArray(records)) {
    console.error('Invalid data structure for records:', records);
    return null; // or render an appropriate message
  }

  return (
    <div>
      <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          records.map((record, index) =>(
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{record.firstName}</td>
              <td>{record.lastName}</td>
              <td>{record.phoneNumber}</td>
              <td>{record.gender}</td>
              <td>{record.address}</td>
            </tr>
          ))
        }
      </tbody>
      </Table>
    </div>
  )
}
