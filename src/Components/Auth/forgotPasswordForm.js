import React from 'react'

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
    <form onSubmit={handleForgotPasswordClick} className="forgot-password-form">
        <h2>Recuperar Contraseña</h2>
        <div className="input-field">
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
        <button  className="btn" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar código'}
        </button>
        {/* <button className="btn-secundary" type="button" onClick={(e) => {e.preventDefault(); toggleForgotPassword();}}>
            Cancelar
        </button> */}
    </form>
  );
};
export default forgotPasswordForm
