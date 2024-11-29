import React from 'react'
import { Link } from 'react-router-dom';
import style from '../../assets/style/Login.module.css';

 const registerDialog = ({ onClick }) => {
  return (
    <div className={`${style.panel} ${style['left-panel']}`}>
        <div className={style.content}>
            <h3>¿Nuevo aqui?</h3>
            <p>
                ¡Únete a nosotros <b>FASTCABS</b> hoy mismo y disfruta de una experiencia única con nuestros servicios!
                <br />
                <Link to="/" className={style.inicio}><h5>Volver al inicio</h5></Link>
                <br />
                <b>¡NO TE PIERDAS ESTA OPORTUNIDAD!</b>
            </p>
            <button 
                className={style.btn + " " + style.transparent} onClick={onClick} >
                <b>Registrarse</b>
            </button>
        </div>
    </div>
  )
};

export default registerDialog;