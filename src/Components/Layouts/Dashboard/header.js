import React from 'react';
import Nav from './nav';

const header = ({ rol }) => {
  return (
    <header className='container'>
        <Nav rol={rol} />        
    </header>
  )
}

export default header