import React from 'react'
import Header from './Header';
import Main from './Main';

function dashboard({nombre, rol}) {
  return (
    <>
    <Header nombre={nombre} rol={rol}/>
    <Main />
    </>
  )
}

export default dashboard