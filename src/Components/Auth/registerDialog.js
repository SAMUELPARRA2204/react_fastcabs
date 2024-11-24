import React from 'react'
import { Link } from 'react-router-dom';

 const registerDialog = ({ onClick }) => {
  return (
    <div className='panel left-panel'>
        <div className='content'>
            <h3>¿Nuevo aqui?</h3>
            <p>
                ¡Únete a nosotros <b>FASTCABS</b> hoy mismo y disfruta de una experiencia única con nuestros servicios!
                <br />
                <Link to="/" className="inicio"><h5>Volver al inicio</h5></Link>
                <br />
                <b>¡NO TE PIERDAS ESTA OPORTUNIDAD!</b>
            </p>
            <button 
                className='btn transparent' onClick={onClick} >
                <b>Registrarse</b>
            </button>
        </div>
    </div>
  )
};

export default registerDialog;