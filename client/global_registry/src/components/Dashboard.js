import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
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

  return (
    <div>
      <Navbar className='nav-bar' data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home" className='nav-brand'>
            <img src={Logo} alt='GPRC-Logo' className='church-logo'/>
            <h6>Global Rescue Power Chapel</h6>
          </Navbar.Brand>
          <Nav className="float-end">
            <Nav.Link href="#unicast">Unicast</Nav.Link>
            <Nav.Link href="#multicast">Multicast</Nav.Link>
            <Nav.Link href="#broadcast">Broadcast</Nav.Link>
          </Nav>
          </Container>
      </Navbar>
      <Entries records={entries}/>
      <div>
        <p className='text-center'>Click to add a new entry</p>
      </div>
      <div className='d-grid gap-2 col-1 mx-auto mt-2'>     
        <Button variant="secondary">Add</Button>
      </div>
    </div>
  )
}
