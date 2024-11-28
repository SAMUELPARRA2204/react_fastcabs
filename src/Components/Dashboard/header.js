import React from 'react';
import NavBar from './Nav';


const header = ({ nombre, rol }) => {
  return (
    <header className='containerDashboard'>
        <NavBar nombre={nombre} rol={rol}/>        
    </header>
  )
}

export default header