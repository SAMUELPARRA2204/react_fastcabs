import React from 'react'
import style from '../../assets/style/Login.module.css';

const forgotPasswordForm = 
(
    {
        handleInputChange,
        handleForgotPassword,
        emailData,
        loading,
        toggleForgotPassword,
    }) => {
        const handleForgotPasswordClick = (e) =>{
            e.preventDefault();
            handleForgotPassword(e)
        }
  return (
    <form onSubmit={handleForgotPasswordClick} className={style['forgot-password-form']}>
        <h2>Recuperar Contraseña</h2>
        <div className={style['input-field']}>
            <i className='fas fa-envelope'></i>
            <input
                type="email"
                id='correo'
                name="correo"
                value={emailData.correo}
                onChange={handleInputChange}
                required
                placeholder='Correo registrado'
            />
        </div>
        <button  className={style.btn} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar código'}
        </button>
        {/* <button className="btn-secundary" type="button" onClick={(e) => {e.preventDefault(); toggleForgotPassword();}}>
            Cancelar
        </button> */}
    </form>
  );
};
export default forgotPasswordForm
