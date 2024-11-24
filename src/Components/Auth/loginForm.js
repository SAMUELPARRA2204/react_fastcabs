import React from 'react'

const loginForm = 
(
    {
        togglePasswordVisibility,
        handleInputChange,
        handleLogin,
        loginData,
        loading
    }) => {
  return (
    <form onSubmit={handleLogin} className='sign-in-form'>
        <h2 className='title'>Iniciar sesion</h2>
        <div className='input-field'>
            <i className='fas fa-envelope'></i>
            <input 
                type='email'
                id='correo'                 
                name='correo'
                value={loginData.correo}
                onChange={handleInputChange}
                placeholder='Correo electronico'
                required
            />
        </div>
        <div className='input-field'>
            <i 
                className='fas fa-eye toggle-password'
                onClick={() => togglePasswordVisibility('contrasena')}
            />
            <input
                type='password'
                id='contrasena'
                name='contrasena'
                value={loginData.contrasena}
                onChange={handleInputChange}
                placeholder='Contraseña'
                required
            />
        </div>
        <button 
            type='submit'
            className='btn btn solid'
            id='botonalerta'
            disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar sesion"}
        </button>
        <p className='social-text'>Conoce mas de nosotros:</p>
        <div className='social-media'>
            <a href='#' className='social-icon'>
                <i className='fab fa-facebook'></i>
            </a>
            <a href='#' className='social-icon'>
                <i className='fab fa-twitter'></i>
            </a>
            <a href='#' className='social-icon'>
                <i className='fab fa-instagram'></i>
            </a>
            <a href='#' className='social-icon'>
                <i className='fab fa-tiktok'></i>
            </a>
        </div>
    </form>
  )
};

export default loginForm;