import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Logo from '../images/Global-Icon.jpg'
import axios from 'axios';
import Entries from './Entries';

export default function Dashboard() {
  const [entries, setEntries] = useState({});


  useEffect(() =>{
    const fetchData = async () =>{
      try{
      //Make a GET request
      const response = await axios.get('http://localhost:3001/api/get-entries');

      // Update the state with the fetched entries
      setEntries(response.data.entries);
      }catch(error){
        console.log('Error fetching entries:', error.message)
      }
    };

     // Call the fetchData function when the component mounts
     fetchData();
  }, []) // The empty dependency array ensures that this effect runs only once

  const handleAddEntry = async (newEntry) => {
    try {
      // Make a POST request to save the new entry
      const update = await axios.post('http://localhost:3001/api/add-member', newEntry);
      if (update){
      }
      
    } catch (error) {
      console.log('Error adding entry:', error.message);
    }
    
  };

  return (
    <div>
      <Navbar className='nav-bar' data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home" className='nav-brand'>
            <img src={Logo} alt='GPRC-Logo' className='church-logo'/>
            <h6>Global Rescue Power Chapel</h6>
          </Navbar.Brand>
          <h5 className='text-center mt-3'>Admin Dashboard</h5>
          <Nav className="float-end">
            <Nav.Link href="#unicast">Unicast</Nav.Link>
            <Nav.Link href="#multicast">Multicast</Nav.Link>
            <Nav.Link href="#broadcast">Broadcast</Nav.Link>
          </Nav>
          </Container>
      </Navbar>
      <Entries records={entries} onAddEntry={handleAddEntry}/>
    </div>
  )
}
