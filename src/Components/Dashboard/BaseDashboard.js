import React from 'react'
import Header from './Header';
import Main from './Main';
<<<<<<< HEAD
=======
import 'bootstrap/dist/css/bootstrap.min.css';
 import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)

function dashboard({nombre, rol}) {
  return (
    <>
    <Header nombre={nombre} rol={rol}/>
    <Main />
    </>
  )
}

export default dashboard