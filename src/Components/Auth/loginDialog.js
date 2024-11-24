import React from 'react';
import { Link } from 'react-router-dom';

const loginDialog = ({ onClick }) => {
  return (
    <div className='panel right-panel'>
      <div className='content'>
      <h3>¿Uno de nosotros?</h3>
      <p>
        ¡Bienvenido de vuelta a <b>FASTCABS</b>! Estamos encantados de verte de nuevo en nuestra comunidad. Iniciar
        sesión te brinda acceso a una experiencia personalizada y muchas ventajas exclusivas.
        <br />
        <Link to="/" className="inicio"><h5>Volver al inicio</h5></Link>
        <br />
        Inicia sesión con un solo clic y sumérgete en lo que más te gusta en cuestión de segundos.
      </p>
      <button className='btn transparent' onClick={onClick}>
        <b>Iniciar sesión</b>
      </button>
    </div>
    </div>
  )
};

export default loginDialog;