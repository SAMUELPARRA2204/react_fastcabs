import React from 'react'
import style from '../../assets/style/Login.module.css';
const loginForm = 
(
    {
        handleInputChange,
        handleLogin,
        loginData,
        loading,
        togglePasswordVisibility,
        toggleForgotPassword,
    }) => {
        const handleLoginClick = (e) => {
            e.preventDefault();
            handleLogin(e);
        };

  return (
    <form onSubmit={handleLoginClick} className={style['sign-in-form']}>
        <h2 className={style.title}>Iniciar sesion</h2>
        <div className={style['input-field']}>
            <i className='fas fa-envelope'></i>
            <input 
                type='email'
                id='correo'                 
                name='correo'
                value={loginData.correo}
                onChange={(e) => handleInputChange(e)}
                placeholder='Correo electronico'
                required
            />
        </div>
        <div className={style['input-field']}>
            <i 
                className='fas fa-eye toggle-password'
                onClick={() => togglePasswordVisibility('contrasena')}
            />
            <input
                type='password'
                id='contrasena'
                name='contrasena'
                value={loginData.contrasena}
                onChange={(e) => handleInputChange(e)}
                placeholder='Contraseña'
                required
            />
        </div>
        {/* BOTON INICIO DE SESION */}
        <button 
            type='submit'
            className={style.btn + " " + style.btn + " " + style.solid}
            id='botonalerta'
            disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar sesion"}
        </button>
        {/* Enlace para "¿Olvidaste tu contraseña?" */}
        <button
            type="button"
            className={style['forgot-password-link']}
            onClick={toggleForgotPassword}
        >
            ¿Olvidaste tu contraseña?
        </button>

        <p className={style['social-text']}>Conoce mas de nosotros:</p>
        <div className={style['social-media']}>
            <a href='#' className={style['social-icon']}>
                <i className='fab fa-facebook'></i>
            </a>
            <a href='#' className={style['social-icon']}>
                <i className='fab fa-twitter'></i>
            </a>
            <a href='#' className={style['social-icon']}>
                <i className='fab fa-instagram'></i>
            </a>
            <a href='#' className={style['social-icon']}>
                <i className='fab fa-tiktok'></i>
            </a>
        </div>
    </form>
  )
};

export default loginForm;